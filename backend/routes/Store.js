import express from "express";
import Store from "../models/Store.js";
import Cart from "../models/Cart.js";
import { verifyToken, verifyAdmin } from "../jwt.js";
import Order from "../models/Order.js";
import axios from "axios";

const router = express.Router();

const calculateTotal = async (items) => {
  let total = 0;
  for (const item of items) {
    try {
      const product = await Store.findById(item.productId);
      if (product) {
        total += product.price * item.quantity;
      }
    } catch {}
  }
  return total;
};

router.post("/store/add", verifyToken, async (req, res) => {
  try {
    const { name, description, image, price, category } = req.body || {};
    if (!name || !description || !image || !price || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newItem = new Store({ name, description, image, price, category });
    const saved = await newItem.save();
    res.status(201).json({ message: "Item added to store", item: saved });
  } catch (err) {
    res.status(500).json({ message: "Failed to add item" });
  }
});

router.delete("/store/delete/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const deleted = await Store.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item deleted", item: deleted });
  } catch {
    res.status(500).json({ message: "Failed to delete item" });
  }
});

router.post("/cart/add", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body || {};
    if (!productId) return res.status(400).json({ message: "Product ID required" });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity: 1 }] });
    } else {
      const index = cart.items.findIndex(item => item.productId.toString() === productId);
      if (index > -1) {
        cart.items[index].quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
    }

    await cart.save();
    const totalPrice = await calculateTotal(cart.items);
    res.status(200).json({ message: "Item added to cart", cart, totalPrice });
  } catch {
    res.status(500).json({ message: "Failed to add to cart" });
  }
});

router.delete("/cart/remove/:productId", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();
    const totalPrice = await calculateTotal(cart.items);
    res.status(200).json({ message: "Item removed", cart, totalPrice });
  } catch {
    res.status(500).json({ message: "Failed to remove item from cart" });
  }
});

router.get("/cart", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) return res.status(404).json({ message: "Cart is empty" });
    const total = await calculateTotal(cart.items);
    res.status(200).json({ cart, total });
  } catch {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
});

router.get("/items", async (req, res) => {
  try {
    const items = await Store.find();
    if (!items || items.length === 0) return res.status(404).json({ message: "No items found" });
    res.status(200).json({ items });
  } catch {
    res.status(500).json({ message: "Failed to fetch items" });
  }
});

router.post("/pay", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;
    const products = cart.items.map((item) => {
      const price = item.productId.price || 0;
      total += price * item.quantity;
      return {
        productId: item.productId._id,
        quantity: item.quantity,
      };
    });

    const taxAmount = Math.round(total * 0.08);
    const finalAmount = total + taxAmount;

    const order = new Order({
      userId,
      products,
      address: req.body.address || "Not provided",
    });

  

    const response = await axios.post(
      "https://api-v2.ziina.com/api/payment_intent",
      {
        amount: finalAmount * 100,
        currency_code: "AED",
        message: "Order payment",
        success_url: "www.dubaifitmovement.xyz",
        cancel_url: "www.dubaifitmovement.xyz",
        failure_url: "www.dubaifitmovement.xyz",
        test: true,
        transaction_source: "directApi",
        customer: {
          email: req.user.email || "default@email.com"
        },
        metadata: {
          order_id: order._id,
          user_id: userId
        }
      },
      {
        headers: {
          Authorization: `Bearer 7kwu51197gFeeztgA2r8gX1YZmGINOXi2+W/2JKfXuh3jK1FyPBaMZy7NWd4LJJY`,
          "Content-Type": "application/json",
        },
      }
    );
order.ziina_id = response.data.id;
    await order.save();
    res.status(200).json({ payment_url: response.data });
  } catch (err) {
    res.status(500).json({ message: "Payment initiation failed" });
  }
});
async function getIsPaymentDn(id){
  const res = await axios.get(`https://api-v2.ziina.com/api/payment_intent/${id}`, {
    headers: {
      Authorization: `Bearer 7kwu51197gFeeztgA2r8gX1YZmGINOXi2+W/2JKfXuh3jK1FyPBaMZy7NWd4LJJY`
    }
  })
  console.log(res)
  if(res.data.status === "completed"){
    return true
  }
  return false
}
router.get("/orders", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId }).populate("products.productId");
    if (!orders || orders.length === 0) return res.status(404).json({ message: "No orders found" });
    for (let order of orders) {
      if (order.ziina_id) {
        const isDn = await getIsPaymentDn(order.ziina_id);
        if (isDn) {
          order.status = "processing";
          await order.save();
        } else {
          order.status = "pending";
          await order.save();
        }
      }
    }
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
export default router;
