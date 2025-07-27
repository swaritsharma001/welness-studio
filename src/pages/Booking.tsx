import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Star,
  MapPin,
  Phone,
  Mail,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const yogaClasses = [
  {
    id: 1,
    name: "Hatha Yoga",
    duration: 60,
    price: 120,
    instructor: "Sarah Al-Zahra",
    rating: 4.9,
    description: "Gentle and slow-paced practice focusing on basic postures and breathing.",
    level: "Beginner"
  },
  {
    id: 2,
    name: "Vinyasa Flow",
    duration: 75,
    price: 150,
    instructor: "Ahmed Hassan",
    rating: 4.8,
    description: "Dynamic sequences linking breath and movement in flowing transitions.",
    level: "Intermediate"
  },
  {
    id: 3,
    name: "Power Yoga",
    duration: 90,
    price: 180,
    instructor: "Maria Santos",
    rating: 4.7,
    description: "Vigorous, fitness-oriented approach to yoga for strength and flexibility.",
    level: "Advanced"
  },
  {
    id: 4,
    name: "Restorative Yoga",
    duration: 75,
    price: 140,
    instructor: "Priya Sharma",
    rating: 4.9,
    description: "Gentle, passive practice using props to support deep relaxation.",
    level: "All Levels"
  },
  {
    id: 5,
    name: "Prenatal Yoga",
    duration: 60,
    price: 130,
    instructor: "Lisa Chen",
    rating: 4.8,
    description: "Safe and nurturing practice designed specifically for expecting mothers.",
    level: "Prenatal"
  }
];

const timeSlots = [
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
  "16:00", "17:00", "18:00", "19:00", "20:00"
];

export default function Booking() {
  const [selectedClass, setSelectedClass] = useState<typeof yogaClasses[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    notes: ""
  });
  const { toast } = useToast();

  const handleBooking = () => {
    if (!selectedClass || !selectedDate || !selectedTime || !bookingData.name || !bookingData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to complete your booking.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Booking Confirmed! 🧘‍♀️",
      description: `Your ${selectedClass.name} session with ${selectedClass.instructor} has been booked for ${selectedDate.toLocaleDateString()} at ${selectedTime}.`,
    });

    // Reset form
    setSelectedClass(null);
    setSelectedDate(new Date());
    setSelectedTime("");
    setBookingData({
      name: "",
      email: "",
      phone: "",
      experience: "",
      notes: ""
    });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Book Your Yoga Session
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our variety of yoga classes led by certified instructors. 
            Find the perfect session that matches your experience level and schedule.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Class Selection */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Choose Your Class</h2>
            <div className="grid gap-4">
              {yogaClasses.map((yogaClass, index) => (
                <Card 
                  key={yogaClass.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-card bg-gradient-card border-border/40 animate-scale-in ${
                    selectedClass?.id === yogaClass.id 
                      ? "ring-2 ring-primary border-primary shadow-glow" 
                      : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedClass(yogaClass)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-foreground">
                          {yogaClass.name}
                        </CardTitle>
                        <p className="text-muted-foreground">with {yogaClass.instructor}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          AED {yogaClass.price}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-muted-foreground">{yogaClass.rating}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{yogaClass.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {yogaClass.duration} min
                      </Badge>
                      <Badge variant="secondary">
                        {yogaClass.level}
                      </Badge>
                      {selectedClass?.id === yogaClass.id && (
                        <Badge className="bg-primary text-primary-foreground">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Selected
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <div className="space-y-6">
            <Card className="bg-gradient-card border-border/40 shadow-card animate-fade-in">
              <CardHeader>
                <CardTitle className="text-foreground">Schedule & Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Selection */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Select Date</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 5} // Disable past dates and Fridays
                    className="rounded-md border border-border/40"
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Select Time</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Personal Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Personal Information</h4>
                  
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={bookingData.name}
                      onChange={(e) => setBookingData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={bookingData.email}
                      onChange={(e) => setBookingData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+971 xx xxx xxxx"
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience">Yoga Experience</Label>
                    <Select 
                      value={bookingData.experience} 
                      onValueChange={(value) => setBookingData(prev => ({ ...prev, experience: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Complete Beginner</SelectItem>
                        <SelectItem value="some">Some Experience</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="notes">Special Notes</Label>
                    <Textarea
                      id="notes"
                      value={bookingData.notes}
                      onChange={(e) => setBookingData(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Any injuries, concerns, or special requests..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Booking Summary */}
                {selectedClass && (
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h4 className="font-medium text-foreground mb-2">Booking Summary</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p><strong>Class:</strong> {selectedClass.name}</p>
                      <p><strong>Instructor:</strong> {selectedClass.instructor}</p>
                      <p><strong>Duration:</strong> {selectedClass.duration} minutes</p>
                      <p><strong>Date:</strong> {selectedDate?.toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {selectedTime}</p>
                      <p className="text-lg font-bold text-primary">
                        Total: AED {selectedClass.price}
                      </p>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handleBooking}
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  disabled={!selectedClass}
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Confirm Booking
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="bg-gradient-wellness border-border/40 animate-fade-in">
              <CardContent className="p-6">
                <h4 className="font-medium text-foreground mb-4">Need Help?</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>Dubai, UAE</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>dubaifitmovement.ae@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Classes: 6 AM - 9 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}