import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ShoppingBag, Clock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [instructors, setInstructors] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  api.interceptors.request.use(
    (config) => {
      const token = Cookies.get("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [userRes, instructorRes, bookingRes] = await Promise.all([
          api.get("/api/users/data"),
          api.get("/api/yoga/instructor"),
          api.get("/api/yoga/book"),
        ]);
        setUser(userRes.data.user);
        setInstructors(instructorRes.data);
        setSessions(bookingRes.data);
      } catch (err) {
        console.error("Failed to load data", err);
        toast({ title: "Error", description: "Failed to load dashboard data." });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleCancel = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this session?")) return;
    try {
      await api.delete(`/api/yoga/book/${id}`);
      setSessions((prev) => prev.filter((s: any) => s._id !== id));
      toast({ title: "Cancelled", description: "Your session has been cancelled." });
    } catch (err) {
      console.error("Cancel failed", err);
      toast({ title: "Error", description: "Failed to cancel session." });
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">
            Welcome, <span className="text-primary">{user?.name || "User"}</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your wellness sessions and view your instructors.
          </p>
        </div>

        {loading ? (
          <p className="text-muted-foreground text-center mt-10">Loading...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Instructors</p>
                      <p className="text-3xl font-bold">{instructors.length}</p>
                    </div>
                    <ShoppingBag className="h-6 w-6 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Sessions Booked</p>
                      <p className="text-3xl font-bold">{sessions.length}</p>
                    </div>
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-md font-semibold truncate">{user?.email}</p>
                    </div>
                    <User className="h-6 w-6 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Booked Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sessions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No sessions booked yet.</p>
                ) : (
                  sessions.map((session: any) => (
                    <div
                      key={session._id}
                      className="border p-4 rounded-md flex flex-col md:flex-row justify-between items-start md:items-center"
                    >
                      <div>
                        <p className="font-medium text-foreground">
                          With {session?.instructorId?.name || "Unknown"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {session.date} at {session.time}
                        </p>
                      </div>
                      <div className="flex gap-4 mt-3 md:mt-0 items-center">
                        <Badge variant="secondary">{session.status}</Badge>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleCancel(session._id)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Instructors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {instructors.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No instructors found.</p>
                ) : (
                  instructors.map((inst: any) => (
                    <div
                      key={inst._id}
                      className="border p-4 rounded-md flex justify-between items-center"
                    >
                      <div>
                        <p className="font-semibold">{inst.name}</p>
                        <p className="text-sm text-muted-foreground">AED {inst.price}</p>
                      </div>
                      <Badge>Rating: {inst.rating}</Badge>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}