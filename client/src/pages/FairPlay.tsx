import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Ban, AlertTriangle, Eye, Scale, UserX, FileText, CheckCircle, XCircle, Award } from 'lucide-react';
import Footer from '@/components/Footer';

export default function FairPlay() {
  const principles = [
    {
      icon: Shield,
      title: 'Integrity First',
      description: 'We maintain the highest standards of fairness and transparency. Every user competes on equal footing with access to the same information and opportunities.'
    },
    {
      icon: Scale,
      title: 'Equal Opportunity',
      description: 'All users have equal access to contests, features, and support. We do not favor any user or group. Success on PENTRIX is determined solely by skill and cricket knowledge.'
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'Our rules, points system, and policies are clearly documented and publicly available. We communicate changes openly and provide clear explanations for all decisions.'
    },
    {
      icon: Award,
      title: 'Skill-Based Competition',
      description: 'PENTRIX is a game of skill, not chance. Rankings are determined by cricket knowledge, strategic thinking, and player selection abilities - not luck or financial investment.'
    }
  ];

  const prohibitedActivities = [
    {
      activity: 'Multiple Accounts',
      description: 'Creating or using more than one account per person. Each user is allowed exactly one account.',
      severity: 'High',
      consequence: 'Immediate permanent ban of all accounts'
    },
    {
      activity: 'Collusion',
      description: 'Coordinating with other users to gain unfair advantages, sharing team information, or manipulating contest outcomes.',
      severity: 'Critical',
      consequence: 'Permanent ban + possible legal action'
    },
    {
      activity: 'Bot/Script Usage',
      description: 'Using automated tools, bots, scripts, or third-party software to create teams, join contests, or gain advantages.',
      severity: 'Critical',
      consequence: 'Immediate permanent ban'
    },
    {
      activity: 'Exploiting Bugs',
      description: 'Intentionally exploiting platform bugs, glitches, or vulnerabilities for personal gain instead of reporting them.',
      severity: 'High',
      consequence: 'Permanent ban + recovery of ill-gotten gains'
    },
    {
      activity: 'Account Sharing',
      description: 'Sharing account credentials with others or allowing others to use your account.',
      severity: 'Medium',
      consequence: 'Account suspension (7-30 days) or permanent ban'
    },
    {
      activity: 'False Information',
      description: 'Providing fake identity, age, or location information during registration or verification.',
      severity: 'High',
      consequence: 'Immediate account termination'
    },
    {
      activity: 'Harassment',
      description: 'Harassing, threatening, abusing, or bullying other users through any platform feature.',
      severity: 'High',
      consequence: 'Permanent ban + possible legal action'
    },
    {
      activity: 'Circumventing Restrictions',
      description: 'Attempting to bypass age verification, geographic restrictions, or account suspensions.',
      severity: 'Critical',
      consequence: 'Permanent ban + possible legal action'
    }
  ];

  const reportingProcess = [
    {
      step: 1,
      title: 'Identify Violation',
      description: 'If you suspect a user is violating fair play policies, gather relevant information (username, contest ID, match ID, description of violation).'
    },
    {
      step: 2,
      title: 'Submit Report',
      description: 'Email fairplay@pentrix.com with detailed information about the suspected violation. Include screenshots or evidence if available.'
    },
    {
      step: 3,
      title: 'Investigation',
      description: 'Our Fair Play team will investigate the report within 48-72 hours. All reports are treated confidentially.'
    },
    {
      step: 4,
      title: 'Action Taken',
      description: 'If a violation is confirmed, appropriate action will be taken (warning, suspension, or ban). You will be notified of the outcome.'
    }
  ];

  return (
    <>
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Fair Play Policy</h1>
          <p className="text-lg opacity-90">
            Ensuring integrity, fairness, and equal opportunity for all users
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-4xl mx-auto space-y-10">
          <Card className="border-blue-500/50 bg-blue-50 dark:bg-blue-950/20">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Our Commitment to Fair Play
                  </p>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    PENTRIX is built on the principles of fairness, integrity, and skill-based competition. 
                    We have zero tolerance for cheating, fraud, or any activity that undermines the integrity 
                    of our platform. This policy outlines our fair play standards and the consequences for violations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <section>
            <h2 className="text-2xl font-bold mb-6">Core Fair Play Principles</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {principles.map((principle, idx) => {
                const Icon = principle.icon;
                return (
                  <Card key={idx}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Icon className="w-5 h-5 text-primary" />
                        {principle.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{principle.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Prohibited Activities</h2>
            <p className="text-muted-foreground mb-6">
              The following activities are strictly prohibited on PENTRIX and will result in immediate action:
            </p>
            <div className="space-y-4">
              {prohibitedActivities.map((item, idx) => (
                <Card key={idx} className="border-l-4 border-l-red-500">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <Ban className="w-5 h-5 text-red-600" />
                        <CardTitle className="text-lg">{item.activity}</CardTitle>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        item.severity === 'Critical' ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200' :
                        item.severity === 'High' ? 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200'
                      }`}>
                        {item.severity} Severity
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="font-semibold">Consequence:</span>
                      <span className="text-muted-foreground">{item.consequence}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="bg-muted/30 py-8 px-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Acceptable vs. Unacceptable Behavior</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-green-700 dark:text-green-400 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Acceptable Behavior
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Creating multiple teams for the same match (up to 11)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Discussing strategies in public forums</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Using publicly available cricket statistics and analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Sharing general tips and advice with other users</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Reporting bugs and vulnerabilities to PENTRIX</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Competing in multiple contests with different teams</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-red-700 dark:text-red-400 mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Unacceptable Behavior
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>Sharing your exact team composition before match starts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>Coordinating team selections with other users</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>Using insider information not publicly available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>Creating fake accounts to test strategies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>Exploiting platform bugs for personal advantage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>Using automated tools to create or manage teams</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Enforcement and Consequences</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-6">
                  PENTRIX takes fair play violations seriously. Our enforcement process is designed to be fair, 
                  transparent, and proportionate to the severity of the violation.
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      First Offense (Minor Violations)
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Warning issued via email. User is informed of the violation and given guidance on acceptable behavior. 
                      Temporary restrictions may be applied (e.g., unable to join new contests for 24-48 hours).
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Ban className="w-5 h-5 text-orange-600" />
                      Second Offense (Repeated Violations)
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Temporary account suspension for 7-30 days depending on severity. User cannot access the platform 
                      during suspension. All active contests are forfeited.
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <UserX className="w-5 h-5 text-red-600" />
                      Third Offense or Critical Violations
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Permanent account ban. User is permanently prohibited from using PENTRIX. IP address and device 
                      may be blocked. Legal action may be pursued for severe violations (fraud, hacking, etc.).
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-6">
                  <strong>Note:</strong> Critical violations (collusion, bot usage, multiple accounts, exploiting bugs) 
                  may result in immediate permanent ban without prior warnings.
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Reporting Violations</h2>
            <p className="text-muted-foreground mb-6">
              If you suspect another user is violating our Fair Play Policy, please report it immediately:
            </p>
            <div className="space-y-4">
              {reportingProcess.map((item) => (
                <Card key={item.step}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground ml-13">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="mt-6 border-primary/50">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-semibold mb-2">Confidentiality Guaranteed</p>
                    <p>
                      All reports are treated confidentially. Your identity will not be disclosed to the reported user. 
                      False reports made maliciously may result in action against the reporting user.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Detection and Monitoring</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  PENTRIX employs multiple methods to detect and prevent fair play violations:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Eye className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Automated systems monitor for suspicious patterns (multiple accounts, collusion, bot activity)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Eye className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Manual review of user reports and flagged accounts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Eye className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>IP address and device fingerprinting to detect multiple accounts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Eye className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Behavioral analysis to identify bot usage and automation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Eye className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Statistical analysis to detect collusion and coordinated activity</span>
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  Our detection systems are continuously improved to stay ahead of new cheating methods.
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Appeals Process</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  If you believe you have been wrongly accused or penalized:
                </p>
                <ol className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="font-semibold">1.</span>
                    <span>Email appeals@pentrix.com within 7 days of the penalty</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold">2.</span>
                    <span>Include your username, penalty details, and explanation</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold">3.</span>
                    <span>Provide any evidence supporting your case</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold">4.</span>
                    <span>Our appeals team will review within 5-7 business days</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold">5.</span>
                    <span>You will be notified of the appeal decision via email</span>
                  </li>
                </ol>
                <p className="text-sm text-muted-foreground mt-4">
                  <strong>Note:</strong> Appeals decisions are final. Repeated frivolous appeals may result in 
                  communication restrictions.
                </p>
              </CardContent>
            </Card>
          </section>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Play Fair, Play Smart</h3>
                <p className="text-muted-foreground mb-6">
                  Fair play is the foundation of PENTRIX. By following these guidelines, you help create a 
                  positive, competitive environment for all users. Together, we can maintain the integrity of 
                  fantasy cricket.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:fairplay@pentrix.com"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                  >
                    Report Violation
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Contact Support
                  </a>
                </div>
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
