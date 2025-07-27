import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Footer } from "./Footer";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";
import { AuthDialog } from "../auth/AuthDialog";
import cookie from "js-cookie";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = cookie.get("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleAuthClick = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthDialogOpen(true);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-background">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-border/40 z-50 flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="ml-2" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground">Dubai Fit Movement</h1>
              <p className="text-xs text-muted-foreground">Yoga & Wellness Studio</p>
            </div>
          </div>

          {!isAuthenticated && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAuthClick("login")}
                className="text-sm"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAuthClick("signup")}
                className="text-sm"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </Button>
            </div>
          )}
        </header>

        <div className="flex flex-1 w-full pt-16">
          <AppSidebar />

          <main className="flex-1 bg-background flex flex-col">
            <div className="flex-1 animate-fade-in">
              {children}
            </div>
            <Footer />
          </main>
        </div>

        <AuthDialog 
          open={authDialogOpen} 
          onOpenChange={setAuthDialogOpen}
          mode={authMode}
          onModeChange={setAuthMode}
        />
      </div>
    </SidebarProvider>
  );
}