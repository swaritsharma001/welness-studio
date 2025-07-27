import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Heart, Mail, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border/40 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Dubai Fit Movement</h3>
            <p className="text-sm text-muted-foreground">
              Transforming lives through yoga and wellness in the heart of Dubai.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 text-primary" />
              <span>Spreading wellness since 2024</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Quick Links</h4>
            <nav className="space-y-2">
              <Link 
                to="/booking" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Book a Session
              </Link>
              <Link 
                to="/shop" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Shop Products
              </Link>
              <Link 
                to="/about" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                About Us
              </Link>
              <Link 
                to="/dashboard" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <a 
                  href="mailto:dubaifitmovement.ae@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  dubaifitmovement.ae@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Dubai, UAE</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Dubai Fit Movement. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <Link 
              to="/privacy" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}