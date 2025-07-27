import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL;

export default function Cart() {
  const [items, setItems] = useState([]);
  const { toast } = useToast();

  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/store/cart`, { withCredentials: true });
        const cartItems = response.data.cart?.items || [];
        const formattedItems = cartItems.map((item) => ({
          id: item.productId._id,
          name: item.productId.name,
          price: item.productId.price,
          image: item.productId.image,
          quantity: item.quantity,
        }));
        setItems(formattedItems);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load cart items.",
          variant: "destructive",
        });
      }
    };
    fetchCart();
  }, []);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const getTotalItems = () => items.reduce((acc, item) => acc + item.quantity, 0);
  const getTotalPrice = () => items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await axios.put(
        `${API_URL}/api/store/cart/update`,
        { productId: id, quantity: newQuantity },
        { withCredentials: true }
      );
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
      );
    } catch {
      toast({
        title: "Error",
        description: "Could not update item quantity.",
        variant: "destructive",
      });
    }
  };

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/store/cart/remove/${id}`, { withCredentials: true });
      setItems((prev) => prev.filter((item) => item.id !== id));
      toast({ title: "Removed", description: "Item removed from cart." });
    } catch {
      toast({
        title: "Error",
        description: "Could not remove item from cart.",
        variant: "destructive",
      });
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`${API_URL}/api/store/cart/clear`, { withCredentials: true });
      setItems([]);
      toast({ title: "Cart cleared", description: "All items have been removed from your cart." });
    } catch {
      toast({
        title: "Error",
        description: "Could not clear cart.",
        variant: "destructive",
      });
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }
    if (
      !address.fullName ||
      !address.street||
      !address.city ||
      !address.state ||
      !address.postalCode||
      !address.country ||
      !address.phone
    ) {
      toast({
        title: "Incomplete Address",
        description: "Please fill in all required address fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      toast({
        title: "Proceeding to checkout",
        description: "Redirecting to payment...",
      });

      const response = await axios.post(
        `${API_URL}/api/store/pay`,
        { address },
        { withCredentials: true }
      );
      const paymentUrl =
        response.data.payment_url.redirect_url;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        toast({
          title: "Payment Error",
          description: "Could not initiate payment.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong during checkout.",
        variant: "destructive",
      });
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Your Cart
            </h1>
            <p className="text-lg text-muted-foreground">Your yoga essentials await</p>
          </div>
          <Card className="bg-gradient-card border-border/40 shadow-card">
            <CardContent className="p-12 text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">
                Discover our amazing yoga products and start your journey!
              </p>
              <Button
                asChild
                size="lg"
                className="bg-gradient-primary text-primary-foreground hover:opacity-90"
              >
                <Link to="/shop">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Continue Shopping
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Your Cart
          </h1>
          <p className="text-lg text-muted-foreground">
            {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"} in your cart
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Cart Items</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={clearCart}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </div>
            {items.map((item) => (
              <Card key={item.id} className="bg-gradient-card border-border/40 shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-primary font-bold text-xl">${item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive hover:text-destructive mt-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="lg:col-span-1">
            <Card className="bg-gradient-card border-border/40 shadow-card sticky top-6">
              <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (8%)</span>
                  <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${(getTotalPrice() * 1.08).toFixed(2)}</span>
                  </div>
                </div>
                <div className="space-y-4 mt-6">
                  <h4 className="text-lg font-semibold">Shipping Address</h4>
                  <input
                    type="text"
                    name="fullName"
                    value={address.fullName}
                    onChange={handleAddressChange}
                    placeholder="Full Name *"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    name="street"
                    value={address.street}
                    onChange={handleAddressChange}
                    placeholder="Street Address *"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    placeholder="City *"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleAddressChange}
                    placeholder="State / Province *"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    name="postalCode"
                    value={address.pincode}
                    onChange={handleAddressChange}
                    placeholder="Postal Code *"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    name="country"
                    value={address.country}
                    onChange={handleAddressChange}
                    placeholder="Country *"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={address.phone}
                    onChange={handleAddressChange}
                    placeholder="Phone Number (Optional)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button
                  className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 mt-4"
                  size="lg"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
                <Button variant="outline" className="w-full" size="lg" asChild>
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
                <div className="mt-6 p-4 bg-muted/50 rounded-lg text-center">
                  <h4 className="font-semibold text-sm mb-2">Secure Payment</h4>
                  <p className="text-xs text-muted-foreground">
                    Your payment information is processed securely. We do not store credit card details.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
