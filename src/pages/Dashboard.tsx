import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  ShoppingBag, 
  Star, 
  TrendingUp,
  Clock,
  Heart,
  Award,
  User,
  Settings
} from "lucide-react";

const upcomingSessions = [
  { id: 1, class: "Vinyasa Flow", instructor: "Ahmed Hassan", date: "2024-07-25", time: "18:00", duration: 75 },
  { id: 2, class: "Hatha Yoga", instructor: "Sarah Al-Zahra", date: "2024-07-27", time: "09:00", duration: 60 },
  { id: 3, class: "Power Yoga", instructor: "Maria Santos", date: "2024-07-29", time: "19:00", duration: 90 }
];

const recentOrders = [
  { id: 1, item: "Premium Yoga Mat", price: 149, status: "Delivered", date: "2024-07-20" },
  { id: 2, item: "Meditation Cushion Set", price: 89, status: "Shipped", date: "2024-07-22" },
  { id: 3, item: "Resistance Bands Set", price: 59, status: "Processing", date: "2024-07-24" }
];

const achievements = [
  { title: "First Session", description: "Completed your first yoga session", earned: true },
  { title: "Week Warrior", description: "Attended 3 sessions in one week", earned: true },
  { title: "Mindful Shopper", description: "Made your first equipment purchase", earned: true },
  { title: "Flexibility Master", description: "Complete 10 sessions", earned: false, progress: 7 }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2 text-foreground">
            Welcome back, <span className="bg-gradient-primary bg-clip-text text-transparent">Yogi</span>!
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your wellness journey and manage your bookings
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-border/40 shadow-soft animate-scale-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Sessions</p>
                  <p className="text-3xl font-bold text-foreground">24</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/40 shadow-soft animate-scale-in" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Hours Practiced</p>
                  <p className="text-3xl font-bold text-foreground">32</p>
                </div>
                <div className="p-3 bg-wellness/20 rounded-full">
                  <Clock className="h-6 w-6 text-wellness-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/40 shadow-soft animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Orders</p>
                  <p className="text-3xl font-bold text-foreground">8</p>
                </div>
                <div className="p-3 bg-accent/20 rounded-full">
                  <ShoppingBag className="h-6 w-6 text-accent-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/40 shadow-soft animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Achievements</p>
                  <p className="text-3xl font-bold text-foreground">3</p>
                </div>
                <div className="p-3 bg-yellow-500/10 rounded-full">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Sessions */}
            <Card className="bg-gradient-card border-border/40 shadow-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingSessions.map((session, index) => (
                    <div 
                      key={session.id} 
                      className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/40 animate-slide-in-right"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{session.class}</h4>
                        <p className="text-sm text-muted-foreground">with {session.instructor}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>{session.date}</span>
                          <span>{session.time}</span>
                          <span>{session.duration} min</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Reschedule</Button>
                        <Button variant="destructive" size="sm">Cancel</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card className="bg-gradient-card border-border/40 shadow-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order, index) => (
                    <div 
                      key={order.id} 
                      className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/40 animate-slide-in-right"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{order.item}</h4>
                        <p className="text-sm text-muted-foreground">Ordered on {order.date}</p>
                        <p className="text-lg font-bold text-primary">AED {order.price}</p>
                      </div>
                      <Badge 
                        variant={
                          order.status === "Delivered" ? "default" : 
                          order.status === "Shipped" ? "secondary" : "outline"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card className="bg-gradient-wellness border-border/40 shadow-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <User className="h-5 w-5 text-primary" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">John Doe</h3>
                <p className="text-sm text-muted-foreground mb-4">john.doe@email.com</p>
                <Button variant="outline" size="sm" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-gradient-card border-border/40 shadow-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Award className="h-5 w-5 text-yellow-600" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg border transition-all duration-300 animate-scale-in ${
                        achievement.earned 
                          ? "bg-primary/5 border-primary/20" 
                          : "bg-muted/30 border-border/40"
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          achievement.earned 
                            ? "bg-primary/10 text-primary" 
                            : "bg-muted text-muted-foreground"
                        }`}>
                          <Award className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium ${
                            achievement.earned ? "text-foreground" : "text-muted-foreground"
                          }`}>
                            {achievement.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {achievement.description}
                          </p>
                          {!achievement.earned && achievement.progress && (
                            <div className="mt-2">
                              <Progress 
                                value={(achievement.progress / 10) * 100} 
                                className="h-2"
                              />
                              <p className="text-xs text-muted-foreground mt-1">
                                {achievement.progress}/10 sessions
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-card border-border/40 shadow-card animate-fade-in">
              <CardHeader>
                <CardTitle className="text-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book New Session
                </Button>
                <Button variant="outline" className="w-full">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Browse Shop
                </Button>
                <Button variant="outline" className="w-full">
                  <Heart className="h-4 w-4 mr-2" />
                  View Favorites
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}