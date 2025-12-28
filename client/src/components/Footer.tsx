import { Link } from 'wouter';
import { Mail, Phone, ExternalLink, Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="bg-muted/50 py-12 border-t">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img src="/logos/pentrix-logo-dark.png" alt="PENTRIX" className="h-8" />
            <p className="text-sm text-muted-foreground">
              India's premier free-to-play fantasy cricket platform. Skill-based gaming for entertainment only.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@pentrix.com" className="hover:text-foreground">support@pentrix.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91 1800-XXX-XXXX</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/matches" className="hover:text-foreground transition-colors text-muted-foreground">Matches</Link></li>
              <li><Link href="/contests" className="hover:text-foreground transition-colors text-muted-foreground">Contests</Link></li>
              <li><Link href="/my-teams" className="hover:text-foreground transition-colors text-muted-foreground">My Teams</Link></li>
              <li><Link href="/leaderboard/1" className="hover:text-foreground transition-colors text-muted-foreground">Leaderboard</Link></li>
              <li><Link href="/results" className="hover:text-foreground transition-colors text-muted-foreground">Results</Link></li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h4 className="font-semibold mb-4">Learn</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/how-to-play" className="hover:text-foreground transition-colors text-muted-foreground">How to Play</Link></li>
              <li><Link href="/faqs" className="hover:text-foreground transition-colors text-muted-foreground">FAQs</Link></li>
              <li><Link href="/about" className="hover:text-foreground transition-colors text-muted-foreground">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors text-muted-foreground">Contact Us</Link></li>
              <li><Link href="/fair-play" className="hover:text-foreground transition-colors text-muted-foreground">Fair Play Policy</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="hover:text-foreground transition-colors text-muted-foreground">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground transition-colors text-muted-foreground">Privacy Policy</Link></li>
              <li><Link href="/responsible-gaming" className="hover:text-foreground transition-colors text-muted-foreground">Responsible Gaming</Link></li>
              <li><Link href="/legality" className="hover:text-foreground transition-colors text-muted-foreground">Legality</Link></li>
              <li><Link href="/refund-policy" className="hover:text-foreground transition-colors text-muted-foreground">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="text-center md:text-left">
              <p className="font-semibold">© 2025 PENTRIX ZONE PRIVATE LIMITED. All rights reserved.</p>
              <p className="text-xs mt-1">CIN: U74999TN2018PTC124738 | GST: 33AAKCP1307J1ZL</p>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://twitter.com/pentrix" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                <ExternalLink className="w-4 h-4" />
              </a>
              <a href="https://facebook.com/pentrix" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                <ExternalLink className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/pentrix" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Registered Office */}
          <div className="text-xs text-center text-muted-foreground bg-muted/50 p-4 rounded-lg">
            <p className="font-semibold mb-1">Registered Office Address:</p>
            <p>No. 47/49, Abdul Azeez Street, 301 Skanda Flats, T. Nagar, Chennai, Tamil Nadu – 600017, India</p>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-center text-muted-foreground">
            <p>
              <Info className="w-3 h-3 inline mr-1" />
              This game involves an element of financial risk and may be addictive. Please play responsibly and at your own risk.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
