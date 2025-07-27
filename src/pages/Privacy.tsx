import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Lock, UserCheck, Mail, AlertCircle } from "lucide-react";

const sections = [
  {
    icon: Eye,
    title: "Information We Collect",
    content: [
      "Personal identification information (name, email, phone number)",
      "Payment and billing information",
      "Class preferences and booking history", 
      "Device and usage information when you visit our website",
      "Communications between you and our studio"
    ]
  },
  {
    icon: Lock,
    title: "How We Use Your Information",
    content: [
      "To provide and improve our yoga classes and services",
      "To process bookings and handle payments securely",
      "To communicate about classes, schedules, and studio updates",
      "To personalize your experience and recommend suitable classes",
      "To comply with legal obligations and protect our rights"
    ]
  },
  {
    icon: UserCheck,
    title: "Information Sharing",
    content: [
      "We do not sell, trade, or rent your personal information",
      "We may share information with trusted service providers (payment processors, email services)",
      "We may disclose information when required by law or to protect our rights",
      "Anonymous, aggregated data may be used for analytics and research"
    ]
  },
  {
    icon: Shield,
    title: "Data Security",
    content: [
      "We implement industry-standard security measures",
      "All payment information is processed through secure, encrypted channels",
      "Access to personal information is restricted to authorized personnel only",
      "Regular security audits and updates to protect your data",
      "Data backup and recovery procedures are in place"
    ]
  }
];

export default function Privacy() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-6">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-foreground">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground mb-4">
            Your privacy is important to us. This policy explains how Dubai Fit Movement 
            collects, uses, and protects your personal information.
          </p>
          <Badge variant="outline" className="px-4 py-2">
            Last updated: July 24, 2024
          </Badge>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card 
              key={index} 
              className="bg-gradient-card border-border/40 shadow-card animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-foreground">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <section.icon className="h-5 w-5 text-primary" />
                  </div>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}

          {/* Additional Sections */}
          <Card className="bg-gradient-card border-border/40 shadow-card animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-foreground">
                <div className="p-2 bg-wellness/20 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-wellness-foreground" />
                </div>
                Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">You have the right to:</p>
              <ul className="space-y-3">
                {[
                  "Access your personal information we hold",
                  "Request correction of inaccurate information", 
                  "Request deletion of your personal information",
                  "Object to processing of your information",
                  "Request transfer of your information to another service",
                  "Withdraw consent for marketing communications"
                ].map((right, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-wellness rounded-full mt-2 flex-shrink-0"></div>
                    <span>{right}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/40 shadow-card animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-foreground">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Mail className="h-5 w-5 text-accent-foreground" />
                </div>
                Cookies and Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Our website uses cookies and similar technologies to enhance your experience:
              </p>
              <ul className="space-y-3">
                {[
                  "Essential cookies for website functionality",
                  "Analytics cookies to understand site usage",
                  "Preference cookies to remember your settings",
                  "Marketing cookies for relevant advertisements (with your consent)"
                ].map((cookie, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>{cookie}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground">
                You can control cookies through your browser settings.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/40 shadow-card animate-fade-in">
            <CardHeader>
              <CardTitle className="text-foreground">Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We may update this privacy policy from time to time. We will notify you of any 
                changes by posting the new policy on this page and updating the "last updated" date.
              </p>
              <p className="text-muted-foreground">
                Continued use of our services after changes indicates acceptance of the updated policy.
              </p>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="bg-gradient-primary text-primary-foreground animate-fade-in">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Questions About This Policy?</h3>
              <p className="mb-6 text-primary-foreground/90">
                If you have any questions about this privacy policy or our data practices, 
                please don't hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Badge variant="secondary" className="px-4 py-2">
                  📧 dubaifitmovement.ae@gmail.com
                </Badge>
                <Badge variant="outline" className="px-4 py-2 border-primary-foreground text-primary-foreground">
                  🌐 www.dubaifitmovement.xyz
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}