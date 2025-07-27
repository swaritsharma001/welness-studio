import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, AlertTriangle, CreditCard, Calendar, Shield, Users } from "lucide-react";

const sections = [
  {
    icon: Users,
    title: "Acceptance of Terms",
    content: [
      "By accessing and using Dubai Fit Movement services, you accept these terms",
      "These terms apply to all visitors, users, and customers of our services",
      "If you disagree with any part of these terms, you may not use our services",
      "We reserve the right to refuse service to anyone for any reason"
    ]
  },
  {
    icon: Calendar,
    title: "Class Bookings & Cancellations",
    content: [
      "All class bookings must be made through our official booking system",
      "Payment is required at the time of booking to secure your spot",
      "Cancellations must be made at least 12 hours before class time",
      "Late cancellations or no-shows will forfeit the full class fee",
      "Class schedules may change due to instructor availability or unforeseen circumstances"
    ]
  },
  {
    icon: CreditCard,
    title: "Payment Terms",
    content: [
      "All payments are processed securely through our payment partner Ziina",
      "Prices are listed in AED and are subject to change without notice",
      "Refunds are provided only for cancelled classes by the studio",
      "Package deals and memberships are non-transferable and non-refundable",
      "Failed payments may result in booking cancellation"
    ]
  },
  {
    icon: Shield,
    title: "Health & Safety",
    content: [
      "Participants practice yoga at their own risk and should consult a doctor before starting",
      "You must disclose any injuries or health conditions to your instructor",
      "Follow all instructor guidance and never force poses beyond your ability",
      "The studio is not liable for injuries sustained during classes",
      "Maintain proper hygiene and respect for shared equipment and space"
    ]
  }
];

export default function Terms() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-6">
            <FileText className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-foreground">Terms of Service</h1>
          <p className="text-lg text-muted-foreground mb-4">
            Please read these terms carefully before using Dubai Fit Movement services. 
            These terms constitute a legal agreement between you and our studio.
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

          {/* Additional Important Sections */}
          <Card className="bg-gradient-card border-border/40 shadow-card animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-foreground">
                <div className="p-2 bg-wellness/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-wellness-foreground" />
                </div>
                Studio Rules & Etiquette
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {[
                  "Arrive at least 10 minutes before class to check in and set up",
                  "Turn off mobile phones and electronic devices during class",
                  "Wear appropriate yoga attire that allows for comfortable movement",
                  "Bring your own yoga mat or rent one from the studio",
                  "Respect other students' space and maintain silence during practice",
                  "Clean and return all borrowed equipment after use",
                  "Children under 16 must be accompanied by an adult",
                  "Pregnant students must get instructor approval before participating"
                ].map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-wellness rounded-full mt-2 flex-shrink-0"></div>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/40 shadow-card animate-fade-in">
            <CardHeader>
              <CardTitle className="text-foreground">Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                All content on our website, including text, graphics, logos, and software, 
                is the property of Dubai Fit Movement and is protected by copyright laws.
              </p>
              <ul className="space-y-3">
                {[
                  "You may not reproduce or distribute our content without permission",
                  "Class sequences and teaching materials are proprietary",
                  "Recording of classes is strictly prohibited",
                  "Our name and logo are registered trademarks"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/40 shadow-card animate-fade-in">
            <CardHeader>
              <CardTitle className="text-foreground">Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Dubai Fit Movement, its owners, instructors, and staff shall not be liable for:
              </p>
              <ul className="space-y-3">
                {[
                  "Any injuries or health issues arising from participation in classes",
                  "Loss or damage to personal belongings in the studio",
                  "Interruption or cancellation of services due to circumstances beyond our control",
                  "Any direct, indirect, incidental, or consequential damages"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground mt-4">
                Your participation in our classes constitutes acceptance of these limitations.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/40 shadow-card animate-fade-in">
            <CardHeader>
              <CardTitle className="text-foreground">Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We reserve the right to terminate or suspend your access to our services 
                immediately, without prior notice, for any reason including:
              </p>
              <ul className="space-y-3">
                {[
                  "Violation of these terms of service",
                  "Disruptive or inappropriate behavior",
                  "Non-payment of fees",
                  "Providing false or misleading information"
                ].map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/40 shadow-card animate-fade-in">
            <CardHeader>
              <CardTitle className="text-foreground">Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We reserve the right to modify these terms at any time. Changes will be 
                effective immediately upon posting on our website.
              </p>
              <p className="text-muted-foreground">
                Your continued use of our services after changes constitutes acceptance 
                of the modified terms.
              </p>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="bg-gradient-primary text-primary-foreground animate-fade-in">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Questions About These Terms?</h3>
              <p className="mb-6 text-primary-foreground/90">
                If you have any questions about these terms of service, 
                please contact us and we'll be happy to help.
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