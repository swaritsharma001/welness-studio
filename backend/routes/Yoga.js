import express from "express";
import Instructor from "../models/Instructor.js";
import { verifyToken, verifyAdmin } from "../jwt.js";
import BookSession from "../models/BookSession.js"
import axios from "axios"

const router = express.Router()

router.post("/instructor/add", verifyToken, async (req, res) => {
  try {
    const { name, price, description, image, rating } = req.body || {};
    if (!name || !price || !description || !image || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const data = new Instructor({ name, price, description, image, rating });
    const saved = await data.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/instructor", async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.status(200).json(instructors);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch instructors" });
  }
});

router.delete("/instructor/:id", verifyAdmin, async (req, res) => {
  try {
    const deleted = await Instructor.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Instructor deleted" });
  } catch (err) {
    res.status(500).json({ message: "Deletion failed" });
  }
});

router.post("/book", verifyToken, async (req, res) => {
  try {
    const { instructorId, date, time, mobile} = req.body || {};
    if (!instructorId || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const data = new BookSession({
      userId: req.user.id,
      instructorId,
      date,
      time,
      mobile
    });

    const amoun = await Instructor.findById(instructorId)
    const amount = amoun.price
    const tax = Math.round(amount * 0.08)
    const finalAmount = amount + tax

    const response = await axios.post(
      "https://api-v2.ziina.com/api/payment_intent",
      {
        amount: finalAmount * 100,
        currency_code: "AED",
        message: "Session payment",
        success_url: "https://www.dubaifitmovement.xyz/",
        cancel_url: "https://www.dubaifitmovement.xyz/",
        failure_url: "https://www.dubaifitmovement.xyz/",
        test: true,
        transaction_source: "directApi",
        customer: {
          email: req.user.email || "default@email.com"
        },
        metadata: {
          order_id: data._id,
          user_id: req.user.id
        }
      },
      {
        headers: {
          Authorization: `Bearer 7kwu51197gFeeztgA2r8gX1YZmGINOXi2+W/2JKfXuh3jK1FyPBaMZy7NWd4LJJY`,
          "Content-Type": "application/json",
        },
    }      );
    data.ziina_id = response.data.id
    const saved = await data.save();
    const pay = response.data.redirect_url
    console.log(pay)
    res.status(201).json(pay);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Something went wrong" });
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

router.get("/book", verifyAdmin, async (req, res) => {
  try {
    const sessions = await BookSession.find()
      .populate("userId", "name")
      .populate("instructorId", "name");

    for (let s of sessions) {
      if (s.ziina_id) {
        const isDn = await getIsPaymentDn(s.ziina_id);
        if (isDn) {
          session.status = "processing";
          await order.save();
        } else {
 session.status = "pending";
          await order.save();
        }
      }
    }
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch sessions" });
  }
});

router.delete("/book/:id", verifyAdmin, async (req, res) => {
  try {
    const deleted = await BookSession.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Session deleted" });
  } catch (err) {
    res.status(500).json({ message: "Deletion failed" });
  }
});

router.patch("/book/status/:id", verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body || {};
    if (!["pending", "confirmed", "cancelled", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const updated = await BookSession.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

export default router;