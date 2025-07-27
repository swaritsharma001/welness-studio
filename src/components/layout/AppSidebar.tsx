import { useState } from "react";
import { 
  Home, 
  ShoppingBag, 
  Calendar, 
  User, 
  Settings,
  Sun,
  Moon,
  Menu,
  X,
  Heart,
  Star,
  Info,
  Shield,
  FileText,
  Users
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import cookie from "js-cookie"
const token = cookie.get("token");

const mainItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Shop", url: "/shop", icon: ShoppingBag },
  { title: "Book Session", url: "/booking", icon: Calendar },
  { title: "Dashboard", url: "/dashboard", icon: User },
  token ? { title: "Cart", url: "/cart", icon: ShoppingBag } : null,
  token ? { title: "Orders", url: "/orders", icon: ShoppingBag } : null
].filter(Boolean); // <-- This line removes the null if ten is falsy


const quickLinks = [
  { title: "Instructors", url: "/instructors", icon: Users },
  { title: "Favorites", url: "/favorites", icon: Heart },
  { title: "Reviews", url: "/reviews", icon: Star },
];

const infoPages = [
  { title: "About", url: "/about", icon: Info },
  { title: "Privacy Policy", url: "/privacy", icon: Shield },
  { title: "Terms of Service", url: "/terms", icon: FileText },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavClasses = (path: string) =>
    isActive(path) 
      ? "bg-primary/10 text-primary border-r-2 border-primary font-medium" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b border-border/40 p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">DY</span>
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h3 className="font-semibold text-foreground">Dubai Yoga</h3>
              <p className="text-xs text-muted-foreground">Wellness Studio</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={`${getNavClasses(item.url)} transition-all duration-200`}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-4" />

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Quick Links
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`${getNavClasses(item.url)} transition-all duration-200`}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-4" />

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Information
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {infoPages.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`${getNavClasses(item.url)} transition-all duration-200`}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 p-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-8 w-8 p-0"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          {!collapsed && (
            <span className="text-xs text-muted-foreground animate-fade-in">
              {theme === "dark" ? "Light" : "Dark"} Mode
            </span>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}