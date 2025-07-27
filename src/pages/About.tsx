import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Users, 
  Award, 
  MapPin,
  Mail,
  Globe,
  Star,
  Leaf,
  Sun
} from "lucide-react";

const team = [
  {
    name: "Sarah Al-Zahra",
    role: "Lead Instructor & Studio Founder",
    experience: "8+ years",
    specialties: ["Hatha Yoga", "Meditation", "Pranayama"],
    bio: "Sarah brings ancient wisdom to modern practice with her gentle yet transformative approach to yoga."
  },
  {
    name: "Ahmed Hassan", 
    role: "Vinyasa Flow Specialist",
    experience: "6+ years",
    specialties: ["Vinyasa", "Power Yoga", "Strength Building"],
    bio: "Ahmed's dynamic classes focus on building strength while maintaining mindful movement."
  },
  {
    name: "Maria Santos",
    role: "Advanced Practice Instructor", 
    experience: "10+ years",
    specialties: ["Ashtanga", "Advanced Poses", "Yoga Philosophy"],
    bio: "Maria guides students safely into advanced practices with deep understanding of yoga tradition."
  },
  {
    name: "Priya Sharma",
    role: "Restorative & Therapeutic Yoga",
    experience: "7+ years", 
    specialties: ["Restorative", "Yin Yoga", "Injury Recovery"],
    bio: "Priya specializes in healing practices that restore balance to both body and mind."
  }
];

const values = [
  {
    icon: Heart,
    title: "Mindful Practice",
    description: "We believe yoga is more than exercise—it's a path to inner peace and self-discovery."
  },
  {
    icon: Users,
    title: "Inclusive Community", 
    description: "Our studio welcomes all bodies, all levels, and all backgrounds with open arms."
  },
  {
    icon: Leaf,
    title: "Holistic Wellness",
    description: "We nurture complete well-being through movement, breath, meditation, and mindfulness."
  },
  {
    icon: Sun,
    title: "Authentic Teaching",
    description: "Our instructors share traditional yoga wisdom adapted for modern life and needs."
  }
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-hero text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in-up">
            About Dubai Fit Movement
          </h1>
          <p className="text-xl mb-8 text-white/90 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Your sanctuary for wellness, growth, and transformation in the heart of Dubai
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-6 text-foreground">Our Story</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded in 2020, Dubai Fit Movement began as a vision to create a welcoming space where 
              ancient yoga traditions meet modern wellness needs. What started as a small studio has 
              grown into a thriving community of practitioners dedicated to mindful living and holistic health.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="animate-fade-in">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Our Mission</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                To make yoga accessible to everyone, regardless of experience level or physical ability. 
                We believe that yoga has the power to transform lives, reduce stress, and build stronger, 
                more compassionate communities.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Through expert instruction, premium equipment, and a supportive environment, we guide 
                our students on their journey toward greater well-being and self-discovery.
              </p>
            </div>
            
            <div className="animate-slide-in-right">
              <Card className="bg-gradient-wellness border-border/40 shadow-card p-6">
                <CardContent className="p-0">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                      <div className="text-sm text-muted-foreground">Happy Students</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">50+</div>
                      <div className="text-sm text-muted-foreground">Classes/Week</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">4</div>
                      <div className="text-sm text-muted-foreground">Expert Instructors</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">5</div>
                      <div className="text-sm text-muted-foreground">Star Rating</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-6 text-foreground">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="text-center bg-gradient-card border-border/40 shadow-soft hover:shadow-card transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-6 text-foreground">Meet Our Instructors</h2>
            <p className="text-lg text-muted-foreground">
              Certified professionals dedicated to your wellness journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <Card 
                key={index} 
                className="bg-gradient-card border-border/40 shadow-card hover:shadow-glow transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground font-bold text-xl">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                      <p className="text-primary font-medium mb-2">{member.role}</p>
                      <p className="text-sm text-muted-foreground mb-3">{member.bio}</p>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">
                          {member.experience}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-muted-foreground">5.0</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {member.specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Location */}
      <section className="py-20 px-4 bg-gradient-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 animate-fade-in">Visit Our Studio</h2>
          <p className="text-xl mb-8 text-primary-foreground/90 animate-fade-in">
            Experience our welcoming space in the heart of Dubai
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="animate-scale-in">
              <div className="p-4 bg-primary-foreground/10 rounded-full w-fit mx-auto mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold mb-2">Location</h3>
              <p className="text-primary-foreground/90">Dubai, UAE</p>
            </div>
            
            <div className="animate-scale-in" style={{ animationDelay: "0.1s" }}>
              <div className="p-4 bg-primary-foreground/10 rounded-full w-fit mx-auto mb-4">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold mb-2">Email</h3>
              <p className="text-primary-foreground/90">dubaifitmovement.ae@gmail.com</p>
            </div>
            
            <div className="animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <div className="p-4 bg-primary-foreground/10 rounded-full w-fit mx-auto mb-4">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold mb-2">Website</h3>
              <p className="text-primary-foreground/90">www.dubaifitmovement.xyz</p>
            </div>
          </div>

          <Button 
            variant="secondary" 
            size="lg" 
            className="animate-fade-in hover:shadow-glow transition-all duration-300"
          >
            Book a Visit
          </Button>
        </div>
      </section>
    </div>
  );
}