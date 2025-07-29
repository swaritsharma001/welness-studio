import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Layout } from "./components/layout/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Favorites from "./pages/Favorites";
import Reviews from "./pages/Reviews";
import Instructors from "./pages/Instructors";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart"
const queryClient = new QueryClient();
import ProtectedRoute from "./contexts/protect"
import Orders from "./pages/Order"

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange={false}
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /> </ProtectedRoute>} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/cart" element={<ProtectedRoute><Cart/> </ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><Orders/> </ProtectedRoute>} />
              <Route path="/instructors" element={<Instructors />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
