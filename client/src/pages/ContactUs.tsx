import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Footer from '@/components/Footer';

export default function ContactUs() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement contact form submission
    alert('Contact form submission will be implemented soon!');
  };

  return (
    <>
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-lg opacity-90">
            Get in touch with our team - we're here to help
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
              <p className="text-muted-foreground mb-6">
                Have questions about PENTRIX? Need help with your account? Our support team is ready to assist you.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:support@pentrix.com" className="text-primary hover:underline">
                      support@pentrix.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">
                      +91 (Support phone number coming soon)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Registered Office</h3>
                    <p className="text-muted-foreground">
                      PENTRIX ZONE PRIVATE LIMITED<br />
                      Tamil Nadu, India<br />
                      CIN: U74999TN2018PTC124738
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Support Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 9:00 AM - 6:00 PM IST<br />
                      Saturday - Sunday: 10:00 AM - 4:00 PM IST
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground mb-2">
                  Find answers to common questions:
                </p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="/faqs" className="text-primary hover:underline">
                      Frequently Asked Questions
                    </a>
                  </li>
                  <li>
                    <a href="/how-to-play" className="text-primary hover:underline">
                      How to Play Guide
                    </a>
                  </li>
                  <li>
                    <a href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter your full name" 
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@example.com" 
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+91 XXXXX XXXXX" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject" 
                      placeholder="What is this regarding?" 
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us how we can help you..." 
                      rows={6}
                      required 
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    We typically respond within 24-48 hours during business days
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  
      <Footer />
    </>
  );
}
