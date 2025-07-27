import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingBag, 
  Calendar, 
  Heart, 
  Users, 
  Star, 
  CheckCircle,
  Leaf,
  Sun,
  Moon
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-yoga.jpg";
import productsImage from "@/assets/yoga-products.jpg";

const benefits = [
  { icon: Heart, title: "Improve Flexibility", description: "Increase your range of motion and mobility" },
  { icon: Leaf, title: "Reduce Stress", description: "Find inner peace and mental clarity" },
  { icon: Users, title: "Build Community", description: "Connect with like-minded wellness enthusiasts" },
  { icon: CheckCircle, title: "Expert Guidance", description: "Learn from certified yoga instructors" }
];

const features = [
  "Beginner to Advanced Classes",
  "One-on-One Sessions Available", 
  "Premium Yoga Equipment",
  "Meditation & Mindfulness",
  "Flexible Scheduling",
  "Wellness Community"
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            Find Your Inner
            <span className="block bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
              Balance
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Transform your mind, body, and spirit with our expert-led yoga sessions 
            and premium wellness products in the heart of Dubai.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 hover:shadow-glow transition-all duration-300">
              <Link to="/shop" className="inline-flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                View Our Products
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-white text-primary hover:bg-white hover:text-primary transition-all duration-300">
              <Link to="/booking" className="inline-flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Book a Yoga Session
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Yoga Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              The Ancient Art of 
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Yoga</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Yoga is more than just physical exercise—it's a holistic practice that unites mind, body, and spirit. 
              Originating over 5,000 years ago, yoga combines physical postures, breathing techniques, and meditation 
              to promote overall wellness and inner peace.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="animate-slide-in-right">
              <img 
                src={productsImage} 
                alt="Yoga practice and equipment" 
                className="rounded-2xl shadow-card w-full h-80 object-cover"
              />
            </div>
            
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-3xl font-bold text-foreground">Why Choose Yoga?</h3>
              <p className="text-muted-foreground leading-relaxed">
                In today's fast-paced world, yoga offers a sanctuary of calm and restoration. Our practice 
                helps you develop strength, flexibility, and mental clarity while reducing stress and anxiety.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="p-4 bg-gradient-card border-border/40 hover:shadow-soft transition-all duration-300 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardContent className="p-0">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-primary/10">
                          <benefit.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-foreground">{benefit.title}</h4>
                          <p className="text-xs text-muted-foreground">{benefit.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-wellness/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground animate-fade-in">
            What Makes Us Special
          </h2>
          <p className="text-lg text-muted-foreground mb-12 animate-fade-in">
            Experience the perfect blend of traditional yoga wisdom and modern wellness practices
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border/40 shadow-soft hover:shadow-card transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 animate-fade-in">
            Ready to Start Your Yoga Journey?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 animate-fade-in">
            Join thousands of students who have transformed their lives through yoga
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button asChild size="lg" variant="secondary" className="hover:shadow-glow transition-all duration-300">
              <Link to="/booking" className="inline-flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Book Your First Session
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300">
              <Link to="/shop" className="inline-flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Yoga Equipment
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4 text-foreground">Get in Touch</h3>
          <p className="text-muted-foreground mb-6">
            Have questions? We're here to help you on your wellness journey.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              📧 dubaifitmovement.ae@gmail.com
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              🌐 www.dubaifitmovement.xyz
            </Badge>
          </div>
        </div>
      </section>
    </div>
  );
}
