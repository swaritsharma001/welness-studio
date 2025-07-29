import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star, CheckCircle, Clock, Users, Heart, Shield, Zap } from "lucide-react";

export default function Instructors() {
  const token = Cookies.get("token")
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [mobile, setMobile] = useState("");
  const [bookingInProgress, setBookingInProgress] = useState(false);

  useEffect(() => {
    const fetchInstructors = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/yoga/instructor`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setInstructors(res.data);
      } catch {
        setError("Failed to load instructors.");
      } finally {
        setLoading(false);
      }
    };
    fetchInstructors();
  }, []);

  const clearBookingFields = () => {
    setSelectedInstructor(null);
    setDate("");
    setTime("");
    setMobile("");
  };

  const handleBookSession = async () => {
    setError("");
    setSuccessMessage("");

    if (!selectedInstructor) {
      setError("Please select an instructor.");
      return;
    }
    if (!date) {
      setError("Please select a date.");
      return;
    }
    if (!time) {
      setError("Please select a time.");
      return;
    }
    if (!mobile.trim()) {
      setError("Please enter your mobile number.");
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      setError("You must be logged in to book a session.");
      return;
    }

    setBookingInProgress(true);
    try {
     const url =  await axios.post(
        `${import.meta.env.VITE_API_URL}/api/yoga/book`,
        { 
          instructorId: selectedInstructor._id, 
          date, 
          time, 
          mobile 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true
        }
      );
      setSuccessMessage("Booking successful!");
      window.location.href = url.data
      clearBookingFields();
    } catch {
      setError("Booking failed. Please try again.");
    } finally {
      setBookingInProgress(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Welcome to Dubai Fit Movement!
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            Enjoy <span className="font-semibold text-foreground">personalized 1-on-1 sessions</span> in the next 7 days to kickstart your routine.
          </p>
          <p className="text-wellness font-medium">
            Choose from coaches below to book your free session
          </p>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">1-on-1 Coaches</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <span>What is a 1-on-1 session?</span>
                <div className="w-4 h-4 rounded-full border border-muted-foreground flex items-center justify-center text-xs">?</div>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  What is a 1-on-1 Session?
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <p className="text-muted-foreground">
                  A personalized yoga experience designed just for you with one of our certified instructors.
                </p>
                {/* ... your dialog content remains unchanged ... */}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {loading && <p className="text-center mb-4">Loading instructors...</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {instructors.map((instructor, index) => (
            <Card
              key={instructor._id}
              className={`bg-gradient-card border-border/40 shadow-card hover:shadow-glow transition-all duration-300 animate-fade-in cursor-pointer ${
                selectedInstructor?._id === instructor._id ? "border-4 border-wellness" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedInstructor(instructor)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={instructor.image} alt={instructor.name} />
                    <AvatarFallback>{instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-foreground">{instructor.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{instructor.name} →</h3>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">Available today</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{instructor.description}</p>
                <p className="text-sm font-medium text-wellness mb-4">AED {instructor.price}/session</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedInstructor && (
          <div className="max-w-md mx-auto mb-12 p-6 rounded-lg bg-gradient-card border border-border/40 shadow-card">
            <h3 className="text-2xl font-semibold mb-6 text-foreground text-center">
              Book Session with {selectedInstructor.name}
            </h3>
            <div className="flex flex-col gap-4 mb-4">
              <label className="flex flex-col text-sm text-muted-foreground font-medium">
                Select Date
                <input
                  type="date"
                  className="mt-1 p-2 rounded border border-border bg-background text-foreground"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().slice(0, 10)}
                />
              </label>

              <label className="flex flex-col text-sm text-muted-foreground font-medium">
                Select Time
                <input
                  type="time"
                  className="mt-1 p-2 rounded border border-border bg-background text-foreground"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </label>

              <label className="flex flex-col text-sm text-muted-foreground font-medium">
                Mobile Number
                <input
                  type="tel"
                  className="mt-1 p-2 rounded border border-border bg-background text-foreground"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+971 50 123 4567"
                  pattern="^\+?\d{7,15}$"
                  required
                />
              </label>
            </div>
            <Button
              className="w-full bg-wellness hover:bg-wellness/90 text-wellness-foreground font-medium py-3"
              onClick={handleBookSession}
              disabled={bookingInProgress}
            >
              {bookingInProgress ? "Booking..." : "Confirm Booking"}
            </Button>
          </div>
        )}

        <Card className="bg-gradient-card border-border/40 shadow-card mb-12 animate-fade-in-up">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Users className="w-8 h-8 text-wellness" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    Looking to practice in a group?
                  </h3>
                  <p className="text-muted-foreground">Join our community classes and practice with others</p>
                </div>
              </div>
              <Button variant="outline" className="border-wellness text-wellness hover:bg-wellness hover:text-wellness-foreground">
                Book a group class
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
