import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ShoppingBag } from "lucide-react";

export default function Favorites() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Your Favorites
          </h1>
          <p className="text-lg text-muted-foreground">
            Items you've saved for later
          </p>
        </div>
        
        <Card className="bg-gradient-card border-border/40 shadow-card">
          <CardContent className="p-12 text-center">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-foreground">No favorites yet</h3>
            <p className="text-muted-foreground">Start browsing our shop to add your favorite items!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}