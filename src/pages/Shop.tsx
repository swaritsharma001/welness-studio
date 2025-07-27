import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Heart, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import cookie from "js-cookie"

const API_URL = import.meta.env.VITE_API_URL; // e.g. https://your-backend.com

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [favorites, setFavorites] = useState([]);
  const { toast } = useToast();

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/store/items`);
        const fetchedProducts = res.data.items || [];
        setProducts(fetchedProducts);

        // Dynamically extract unique categories + add "All" at start
        const uniqueCategories = [
          "All",
          ...Array.from(new Set(fetchedProducts.map(item => item.category))).filter(Boolean),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Failed to fetch items:", err);
      }
    };

    fetchItems();

    // Update login status on localStorage change (if you expect login/logout within same tab)
    setIsLoggedIn(!!cookie.get("token"));
    
  }, []);

  const filteredProducts = products
    .filter(
      product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "All" || product.category === selectedCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const addToCart = async (product) => {
    try {
      const token = cookie.get("token");
      if (!token) {
        return toast({
          title: "Not logged in",
          description: "Please log in to add items to your cart.",
          variant: "destructive",
        });
      }

   //send tomen as cookie
      const d = await axios.post(
        `${API_URL}/api/store/cart/add`,
        { productId: product._id },
        {
          headers: {
            'Authorization': `${token}`,
          },
          withCredentials: true,  // ✅ Required if your server uses cookies
        }
      );

      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (err) {
      console.error("Add to cart error:", err);
      toast({
        title: "Error",
        description: "could not add item",
        variant: "destructive",
      });
    }
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleLogin = () => {
    // Redirect to your login page or show modal
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-primary">Yoga Shop</h1>
          <p className="text-lg text-muted-foreground">
            Premium yoga equipment and wellness products for your practice
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map(product => (
            <Card key={product._id}>
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {product.featured && (
                    <Badge className="absolute top-2 left-2 bg-primary text-white">
                      Featured
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => toggleFavorite(product._id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favorites.includes(product._id)
                          ? "fill-red-500 text-red-500"
                          : "text-muted-foreground"
                      }`}
                    />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="mb-2">{product.name}</CardTitle>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">
                    AED {product.price}
                  </span>
                  {isLoggedIn ? (
                    <Button onClick={() => addToCart(product)}>
                      <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                    </Button>
                  ) : (
                    <Button onClick={handleLogin}>Login to add</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No products found.</p>
          </div>
        )}

        <div className="mt-16 p-6 bg-muted rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Secure Payment with Ziina</h3>
          <p className="text-muted-foreground mb-4">
            We've partnered with Ziina for fast, secure, and convenient payments.
          </p>
          <Badge variant="outline">🤝 Official Ziina Payment Partner</Badge>
        </div>
      </div>
    </div>
  );
}
