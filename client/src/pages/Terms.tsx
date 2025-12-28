import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, FileText, Scale, Shield, UserCheck, Ban, AlertTriangle, Trophy } from 'lucide-react';
import Footer from '@/components/Footer';

export default function Terms() {
  const sections = [
    {
      icon: UserCheck,
      title: '1. Acceptance of Terms',
      content: `By accessing and using PENTRIX ("Platform", "Service", "We", "Us", "Our"), you ("User", "You", "Your") accept and agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you must not use the Platform.

These Terms constitute a legally binding agreement between you and PENTRIX. We reserve the right to modify these Terms at any time. Continued use of the Platform after changes constitutes acceptance of the modified Terms.

Last Updated: December 28, 2025`
    },
    {
      icon: FileText,
      title: '2. Eligibility',
      content: `To use PENTRIX, you must meet the following eligibility criteria:

Age Requirement:
• You must be at least 18 years of age
• Users under 18 are strictly prohibited from creating accounts or using the Platform
• We reserve the right to verify age through documentation

Geographic Restrictions:
PENTRIX is NOT available to residents of the following Indian states due to local regulations:
• Assam
• Nagaland
• Sikkim
• Telangana
• Andhra Pradesh
• Odisha
• Tamil Nadu

Residents of these states are prohibited from registering, accessing, or using the Platform.

Other Requirements:
• You must be a resident of India
• You must provide accurate and truthful information
• You must have the legal capacity to enter into binding contracts
• You must not be previously banned or suspended from the Platform

Verification:
We reserve the right to request identity verification documents at any time. Failure to provide requested documentation may result in account suspension or termination.`
    },
    {
      icon: Shield,
      title: '3. Account Registration and Security',
      content: `Account Creation:
• One account per person - multiple accounts are strictly prohibited
• You must provide accurate, current, and complete information
• You must use your real name and valid contact information
• False information may result in immediate account termination

Account Security:
• You are responsible for maintaining the confidentiality of your password
• You are responsible for all activities under your account
• You must notify us immediately of any unauthorized access
• We are not liable for losses due to unauthorized account use
• Do not share your account credentials with anyone

Account Termination:
• You may request account deletion at any time
• We may suspend or terminate accounts for Terms violations
• We may terminate accounts for fraudulent or suspicious activity
• Terminated accounts cannot be recovered`
    },
    {
      icon: Scale,
      title: '4. Platform Rules and User Conduct',
      content: `Permitted Use:
• Create fantasy cricket teams for entertainment purposes
• Participate in free contests and competitions
• Interact respectfully with other users
• Provide feedback and suggestions

Prohibited Activities:
• Creating multiple accounts or using fake identities
• Using bots, scripts, or automated tools
• Attempting to manipulate contests or outcomes
• Colluding with other users to gain unfair advantages
• Exploiting bugs, glitches, or vulnerabilities
• Harassing, threatening, or abusing other users
• Sharing inappropriate, offensive, or illegal content
• Attempting to hack, disrupt, or damage the Platform
• Reverse engineering or copying Platform code
• Using the Platform for commercial purposes without permission
• Circumventing geographic or age restrictions
• Engaging in any illegal activities

Consequences of Violations:
• First Offense: Warning and temporary restriction
• Second Offense: Temporary suspension (7-30 days)
• Third Offense: Permanent account ban
• Severe Violations: Immediate permanent ban without warning
• Legal action may be pursued for serious violations`
    },
    {
      icon: Trophy,
      title: '5. Fantasy Cricket Game Rules',
      content: `Game Structure:
• PENTRIX is a skill-based fantasy cricket platform
• Users create virtual teams of real cricket players
• Points are awarded based on actual match performance
• Rankings are determined by total fantasy points scored

Team Creation:
• Users can create up to 11 teams per match
• Each team must have exactly 11 players
• Teams must follow role requirements (WK, BAT, AR, BOWL)
• Maximum 7 players from one real cricket team
• Total team cost must not exceed 100 credits
• Captain earns 2x points, Vice-Captain earns 1.5x points

Contest Participation:
• All contests on PENTRIX are free to join
• No entry fees or monetary deposits required
• No monetary prizes awarded
• Users compete for rankings and recognition only

Points System:
• Points are calculated based on official match statistics
• Batting, bowling, and fielding actions earn points
• Detailed points breakdown available in "How to Play"
• Points are final after verification (typically within 2 hours of match end)

Match Cancellations:
• If a match is cancelled before start, all contests are void
• If a match is abandoned after start, points earned until abandonment count (if minimum overs completed)
• We follow official cricket board decisions for all match-related matters`
    },
    {
      icon: FileText,
      title: '6. Intellectual Property',
      content: `Platform Ownership:
• PENTRIX owns all rights to the Platform, including code, design, content, logos, and trademarks
• User-generated content (team names, etc.) remains your property but you grant us license to use it
• You may not copy, modify, distribute, or create derivative works from Platform content
• Unauthorized use of Platform intellectual property may result in legal action

Third-Party Content:
• Cricket data, player information, and match statistics are sourced from licensed third-party providers
• Team logos, player images, and related content are property of respective cricket boards and teams
• We do not claim ownership of third-party intellectual property

User Content License:
• By creating content on PENTRIX (team names, comments, etc.), you grant us a worldwide, non-exclusive, royalty-free license to use, display, and distribute that content
• You represent that you own or have rights to any content you submit
• You will not submit content that infringes third-party rights`
    },
    {
      icon: Ban,
      title: '7. Disclaimers and Limitations of Liability',
      content: `Service Availability:
• PENTRIX is provided "as is" and "as available"
• We do not guarantee uninterrupted or error-free service
• We may suspend service for maintenance, updates, or technical issues
• We are not liable for service disruptions or data loss

Data Accuracy:
• We strive for accurate cricket data but do not guarantee 100% accuracy
• Points calculations are based on third-party data sources
• We are not liable for errors in data or points calculations
• Disputes regarding points must be raised within 48 hours of match end

No Warranties:
• We make no warranties regarding Platform functionality, reliability, or suitability
• We do not warrant that the Platform is free from viruses or harmful components
• We do not guarantee specific outcomes or results from Platform use

Limitation of Liability:
• PENTRIX and its affiliates are not liable for any indirect, incidental, special, or consequential damages
• Our total liability for any claim is limited to INR 1,000 or the amount you paid us (which is zero)
• Some jurisdictions do not allow liability limitations, so these may not apply to you

Third-Party Links:
• Platform may contain links to third-party websites
• We are not responsible for third-party content or practices
• Use of third-party services is at your own risk`
    },
    {
      icon: Shield,
      title: '8. Privacy and Data Protection',
      content: `Data Collection:
• We collect personal information as described in our Privacy Policy
• We use data to provide and improve the Platform
• We do not sell personal data to third parties
• We implement security measures to protect your data

User Responsibilities:
• You are responsible for the accuracy of information you provide
• You must keep your contact information up to date
• You control your privacy settings and notification preferences

Data Retention:
• We retain data as long as your account is active
• Upon account deletion, personal data is removed within 30 days
• Some data may be retained for legal compliance (up to 90 days)

For complete details, please review our Privacy Policy.`
    },
    {
      icon: AlertTriangle,
      title: '9. Indemnification',
      content: `You agree to indemnify, defend, and hold harmless PENTRIX, its affiliates, officers, directors, employees, and agents from any claims, liabilities, damages, losses, costs, or expenses (including legal fees) arising from:

• Your use or misuse of the Platform
• Your violation of these Terms
• Your violation of any third-party rights
• Your violation of applicable laws or regulations
• Content you submit or actions you take on the Platform
• Unauthorized use of your account due to your failure to maintain security

This indemnification obligation survives termination of your account and these Terms.`
    },
    {
      icon: Scale,
      title: '10. Dispute Resolution and Governing Law',
      content: `Governing Law:
• These Terms are governed by the laws of India
• Jurisdiction is subject to courts in [Your City], India
• Any disputes will be resolved in accordance with Indian law

Dispute Resolution Process:
1. Informal Resolution: Contact support@pentrix.com to resolve disputes informally
2. Mediation: If informal resolution fails, parties agree to mediation
3. Arbitration: Unresolved disputes will be settled through binding arbitration in accordance with Indian Arbitration and Conciliation Act, 1996
4. Court Action: Only after exhausting above steps may parties pursue court action

Waiver of Class Actions:
• You agree to resolve disputes individually, not as part of class or collective actions
• You waive the right to participate in class action lawsuits against PENTRIX

Time Limit for Claims:
• Any claims must be filed within one (1) year of the event giving rise to the claim
• Claims filed after one year are permanently barred`
    },
    {
      icon: FileText,
      title: '11. Modifications to Terms',
      content: `Right to Modify:
• We reserve the right to modify these Terms at any time
• Material changes will be notified via email or Platform notification
• Continued use after changes constitutes acceptance
• If you do not agree to changes, you must stop using the Platform

Notification of Changes:
• We will provide at least 7 days notice for material changes
• Notice will be sent to your registered email address
• Changes will be effective after the notice period

Review Responsibility:
• You are responsible for regularly reviewing these Terms
• Current version is always available at pentrix.com/terms
• "Last Updated" date indicates most recent revision`
    },
    {
      icon: AlertCircle,
      title: '12. General Provisions',
      content: `Severability:
• If any provision of these Terms is found invalid or unenforceable, the remaining provisions continue in full force

Entire Agreement:
• These Terms, along with Privacy Policy and other referenced policies, constitute the entire agreement between you and PENTRIX

No Waiver:
• Our failure to enforce any provision does not constitute a waiver of that provision or any other provision

Assignment:
• You may not assign or transfer your rights under these Terms
• We may assign our rights and obligations to any party without notice

Force Majeure:
• We are not liable for failures or delays due to circumstances beyond our reasonable control (natural disasters, wars, strikes, government actions, etc.)

Survival:
• Provisions that by their nature should survive termination will survive (including indemnification, disclaimers, limitations of liability)

Contact Information:
• For questions about these Terms, contact us at legal@pentrix.com
• For general support, contact support@pentrix.com`
    }
  ];

  return (
    <>
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-lg opacity-90">
            Legal terms and conditions for using PENTRIX
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/20">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                    Important Legal Document
                  </p>
                  <p className="text-yellow-800 dark:text-yellow-200">
                    Please read these Terms of Service carefully before using PENTRIX. By using our Platform, 
                    you agree to be bound by these Terms. If you do not agree, you must not use the Platform.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-primary" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {section.content}
                  </div>
                </CardContent>
              </Card>
            );
          })}

          <Card className="border-primary/50">
            <CardHeader>
              <CardTitle>Questions About These Terms?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms of Service, please contact our legal team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:legal@pentrix.com"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                  Contact Legal Team
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  General Support
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  
      <Footer />
    </>
  );
}
