import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Lock, Database, UserCheck, Globe, Bell, Trash2, FileText, AlertCircle } from 'lucide-react';
import Footer from '@/components/Footer';

export default function Privacy() {
  const sections = [
    {
      icon: FileText,
      title: '1. Introduction',
      content: `This Privacy Policy explains how PENTRIX ("we", "us", "our") collects, uses, stores, and protects your personal information when you use our fantasy cricket platform.

We are committed to protecting your privacy and ensuring the security of your personal data. This policy complies with applicable Indian data protection laws and regulations.

Last Updated: December 28, 2025

By using PENTRIX, you consent to the data practices described in this policy.`
    },
    {
      icon: Database,
      title: '2. Information We Collect',
      content: `Personal Information You Provide:
• Name (first and last name)
• Email address
• Date of birth (for age verification)
• State of residence (for geographic compliance)
• Password (stored in encrypted form)
• Phone number (optional, for account recovery)
• Profile picture (optional)

Information Collected Automatically:
• IP address and location data
• Device information (type, operating system, browser)
• Usage data (pages visited, features used, time spent)
• Log data (access times, errors, performance metrics)
• Cookie data (preferences, session information)

Fantasy Cricket Data:
• Teams you create (player selections, team names)
• Contests you join
• Points and rankings
• Match participation history
• User interactions (comments, if applicable)

We do NOT collect:
• Financial information (no payments processed)
• Sensitive personal data (religion, caste, political views)
• Biometric data
• Health information`
    },
    {
      icon: Eye,
      title: '3. How We Use Your Information',
      content: `We use your information for the following purposes:

Platform Functionality:
• Create and manage your account
• Verify your age and geographic eligibility
• Calculate fantasy points and rankings
• Display leaderboards and contest results
• Send important account notifications

Service Improvement:
• Analyze usage patterns to improve features
• Identify and fix technical issues
• Develop new features based on user behavior
• Optimize platform performance

Communication:
• Send account-related emails (registration, password reset)
• Notify you of match updates and contest results
• Share platform updates and new features
• Respond to your support requests

Compliance and Security:
• Enforce our Terms of Service
• Prevent fraud, cheating, and abuse
• Comply with legal obligations
• Protect user safety and platform integrity
• Maintain compliance logs for age and geographic restrictions

We do NOT:
• Sell your personal data to third parties
• Use your data for targeted advertising
• Share your data for marketing purposes
• Process payments (platform is 100% free)`
    },
    {
      icon: Globe,
      title: '4. Information Sharing and Disclosure',
      content: `We share your information only in the following limited circumstances:

Public Information:
• Your username and team names are visible to other users
• Your rankings in contests are publicly displayed
• Your profile picture (if set) is visible to other users

Service Providers:
• Cloud hosting providers (for data storage)
• Email service providers (for notifications)
• Analytics providers (for usage analysis)
• Cricket data providers (for match information)

All service providers are contractually obligated to protect your data and use it only for specified purposes.

Legal Requirements:
We may disclose information if required by law or in response to:
• Court orders or legal processes
• Government or regulatory requests
• Protection of our legal rights
• Prevention of fraud or illegal activities
• Protection of user safety

Business Transfers:
In the event of a merger, acquisition, or sale of assets, user information may be transferred. We will notify you of any such change.

We do NOT:
• Sell or rent your data to third parties
• Share data for marketing or advertising
• Disclose data to cricket boards or teams
• Share data with other users (except public information)`
    },
    {
      icon: Lock,
      title: '5. Data Security',
      content: `We implement industry-standard security measures to protect your information:

Technical Measures:
• Encryption of sensitive data (passwords, personal information)
• Secure HTTPS connections for all data transmission
• Regular security audits and vulnerability assessments
• Firewalls and intrusion detection systems
• Secure database access controls

Organizational Measures:
• Limited employee access to personal data
• Background checks for employees with data access
• Confidentiality agreements with all staff
• Regular security training for employees
• Incident response procedures

Account Security:
• Password strength requirements
• Account lockout after failed login attempts
• Email notifications for suspicious activity
• Secure password reset process
• Session timeout after inactivity

Despite our efforts, no system is 100% secure. You are responsible for:
• Choosing a strong, unique password
• Keeping your password confidential
• Logging out after using shared devices
• Reporting suspicious activity immediately

In the event of a data breach affecting your personal information, we will notify you within 72 hours via email.`
    },
    {
      icon: UserCheck,
      title: '6. Your Rights and Choices',
      content: `You have the following rights regarding your personal information:

Access Rights:
• Request a copy of all personal data we hold about you
• Receive data in a structured, machine-readable format
• Response time: Within 30 days of request

Correction Rights:
• Update or correct inaccurate personal information
• Edit your profile information at any time
• Request correction of data you cannot edit yourself

Deletion Rights:
• Request deletion of your account and personal data
• Data is permanently deleted within 30 days of request
• Some data may be retained for legal compliance (up to 90 days)
• Anonymized data may be retained for analytics

Objection Rights:
• Object to processing of your data for specific purposes
• Opt out of non-essential communications
• Withdraw consent for optional data collection

Data Portability:
• Request your data in a portable format
• Transfer your data to another service (if applicable)

To exercise these rights:
• Email privacy@pentrix.com with your request
• Include your registered email address
• Specify the right you wish to exercise
• We will respond within 30 days

Note: Some rights may be limited by legal requirements or platform functionality.`
    },
    {
      icon: Bell,
      title: '7. Cookies and Tracking Technologies',
      content: `We use cookies and similar technologies to enhance your experience:

Types of Cookies:
• Essential Cookies: Required for platform functionality (login, sessions)
• Preference Cookies: Remember your settings and preferences
• Analytics Cookies: Help us understand usage patterns
• Performance Cookies: Monitor platform performance and errors

We do NOT use:
• Advertising cookies
• Third-party tracking cookies
• Cross-site tracking

Cookie Management:
• You can control cookies through your browser settings
• Disabling essential cookies may affect platform functionality
• You can delete cookies at any time
• Cookie preferences can be updated in your account settings

Other Tracking Technologies:
• Web beacons (for email open rates)
• Local storage (for offline functionality)
• Session storage (for temporary data)

Third-Party Analytics:
• We may use analytics services to understand usage
• These services are configured to anonymize IP addresses
• Data is used only for platform improvement`
    },
    {
      icon: Shield,
      title: '8. Children Privacy',
      content: `PENTRIX is NOT intended for users under 18 years of age.

Age Verification:
• We require users to confirm they are 18+ during registration
• We may request age verification documents
• Accounts found to belong to minors will be immediately terminated

Parental Notice:
• If you believe a minor has created an account, contact us immediately
• We will investigate and delete the account if confirmed
• Parents can request deletion of minor data at privacy@pentrix.com

We do not knowingly:
• Collect information from users under 18
• Target content or marketing to minors
• Allow minors to participate in contests

Compliance:
• We comply with applicable child protection laws
• We take age restrictions seriously
• Violations may result in legal action`
    },
    {
      icon: Globe,
      title: '9. International Data Transfers',
      content: `PENTRIX operates in India and stores data primarily on Indian servers.

Data Location:
• Primary data storage: India
• Backup servers: May be located outside India
• Cloud services: May process data in multiple regions

Data Protection:
• All international transfers comply with Indian data protection laws
• We use standard contractual clauses with international service providers
• Data is encrypted during transfer
• Service providers must meet equivalent security standards

Your Rights:
• You have the right to know where your data is stored
• You can request information about international transfers
• You can object to transfers in certain circumstances

For users outside India:
• PENTRIX is designed for Indian residents
• Use by non-residents is at your own risk
• We may not comply with non-Indian privacy laws`
    },
    {
      icon: Trash2,
      title: '10. Data Retention',
      content: `We retain your data only as long as necessary:

Active Accounts:
• Personal data retained while account is active
• Usage data retained for up to 2 years
• Log data retained for up to 90 days

Deleted Accounts:
• Personal data deleted within 30 days of account deletion
• Anonymized data may be retained indefinitely
• Legal compliance data retained for up to 90 days
• Backup data deleted within next backup cycle (30 days)

Specific Data Types:
• Passwords: Deleted immediately upon account deletion
• Email addresses: Deleted within 30 days
• Fantasy teams: Anonymized and retained for platform statistics
• Contest history: Anonymized and retained
• Support tickets: Retained for 1 year

Legal Holds:
• Data subject to legal proceedings retained until resolved
• Data required for ongoing investigations retained as needed
• We will notify you if your data is subject to legal hold`
    },
    {
      icon: AlertCircle,
      title: '11. Changes to Privacy Policy',
      content: `We may update this Privacy Policy from time to time.

Notification of Changes:
• Material changes will be notified via email
• Notice will be posted on the Platform
• At least 7 days notice before changes take effect
• Continued use after changes constitutes acceptance

Your Options:
• If you disagree with changes, you may delete your account
• Deletion must be requested before changes take effect
• We will process deletion under the old policy

Review Responsibility:
• You are responsible for reviewing this policy regularly
• Current version always available at pentrix.com/privacy
• "Last Updated" date indicates most recent revision

Significant Changes:
• Changes to data collection practices
• Changes to data sharing practices
• Changes to your rights
• Changes to security measures

Minor changes (typos, clarifications) may be made without notice.`
    },
    {
      icon: FileText,
      title: '12. Contact Us',
      content: `For privacy-related questions, concerns, or requests:

Privacy Team:
Email: privacy@pentrix.com
Response Time: Within 48 hours for inquiries, 30 days for data requests

General Support:
Email: support@pentrix.com
Contact Form: pentrix.com/contact

Data Protection Officer:
For serious privacy concerns or complaints
Email: dpo@pentrix.com

Mailing Address:
PENTRIX
[Your Complete Address]
[City, State, PIN Code]
India

When contacting us:
• Include your registered email address
• Clearly describe your concern or request
• Provide relevant details (dates, specific data, etc.)
• Allow up to 30 days for response to data requests

We take privacy seriously and will respond to all legitimate inquiries.`
    }
  ];

  return (
    <>
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-lg opacity-90">
            How we collect, use, and protect your personal information
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="border-blue-500/50 bg-blue-50 dark:bg-blue-950/20">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                    Your Privacy Matters
                  </p>
                  <p className="text-blue-800 dark:text-blue-200">
                    We are committed to protecting your personal information and being transparent about our data practices. 
                    This policy explains what data we collect, how we use it, and your rights regarding your information.
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
              <CardTitle>Privacy Questions or Concerns?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have questions about this Privacy Policy or want to exercise your data rights, please contact our privacy team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:privacy@pentrix.com"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                  Contact Privacy Team
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
