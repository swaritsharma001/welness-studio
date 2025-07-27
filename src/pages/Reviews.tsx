import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function Reviews() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Reviews & Testimonials
          </h1>
          <p className="text-lg text-muted-foreground">
            What our community says about their experience
          </p>
        </div>
        
        <Card className="bg-gradient-card border-border/40 shadow-card">
          <CardContent className="p-12 text-center">
            <Star className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-foreground">Reviews coming soon</h3>
            <p className="text-muted-foreground">We're collecting testimonials from our amazing community!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}