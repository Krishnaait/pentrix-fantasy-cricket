import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, AlertTriangle, Shield, Users, Clock, Brain, Phone, HelpCircle, CheckCircle, XCircle } from 'lucide-react';
import Footer from '@/components/Footer';

export default function ResponsibleGaming() {
  const warningSigns = [
    'Spending excessive time on fantasy cricket (multiple hours daily)',
    'Neglecting work, studies, or personal responsibilities',
    'Feeling anxious or irritable when unable to access the platform',
    'Constantly checking scores and rankings throughout the day',
    'Losing sleep to create teams or check results',
    'Experiencing mood swings based on fantasy performance',
    'Withdrawing from family and social activities',
    'Feeling guilty or ashamed about time spent on fantasy cricket',
    'Continuing to play despite negative consequences',
    'Lying to others about time spent on the platform'
  ];

  const healthyHabits = [
    {
      icon: Clock,
      title: 'Set Time Limits',
      description: 'Allocate specific time slots for fantasy cricket. Use timers or app limits to enforce boundaries. Recommended: No more than 1-2 hours per day.'
    },
    {
      icon: Brain,
      title: 'Maintain Perspective',
      description: 'Remember that fantasy cricket is entertainment, not a measure of self-worth. Wins and losses are part of the game and do not define you.'
    },
    {
      icon: Users,
      title: 'Balance Your Life',
      description: 'Ensure fantasy cricket does not interfere with work, relationships, health, or other important aspects of your life. Maintain diverse interests and activities.'
    },
    {
      icon: Heart,
      title: 'Monitor Your Emotions',
      description: 'Pay attention to how fantasy cricket affects your mood. If you find yourself becoming overly stressed or anxious, take a break.'
    }
  ];

  const resources = [
    {
      organization: 'National Institute of Mental Health and Neurosciences (NIMHANS)',
      phone: '080-26995000',
      website: 'www.nimhans.ac.in',
      description: 'Premier mental health institution offering counseling and support services'
    },
    {
      organization: 'Vandrevala Foundation',
      phone: '1860-2662-345',
      website: 'www.vandrevalafoundation.com',
      description: '24/7 helpline for mental health support and counseling'
    },
    {
      organization: 'iCall Psychosocial Helpline',
      phone: '9152987821',
      website: 'icallhelpline.org',
      description: 'Professional counseling services via phone and email'
    },
    {
      organization: 'COOJ Mental Health Foundation',
      phone: '0832-2252525',
      website: 'cooj.org',
      description: 'Mental health awareness and support services'
    }
  ];

  return (
    <>
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Responsible Gaming</h1>
          <p className="text-lg opacity-90">
            Play smart, play safe, play responsibly
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="border-green-500/50 bg-green-50 dark:bg-green-950/20">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Heart className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-green-900 dark:text-green-100 mb-1">
                    Our Commitment to Your Well-Being
                  </p>
                  <p className="text-green-800 dark:text-green-200">
                    At PENTRIX, we believe fantasy cricket should be fun, engaging, and healthy. This page provides 
                    guidelines, resources, and tools to help you enjoy fantasy cricket responsibly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <section>
            <h2 className="text-2xl font-bold mb-4">What is Responsible Gaming?</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Responsible gaming means enjoying fantasy cricket as a form of entertainment while maintaining 
                  control over your time, emotions, and behavior. It involves:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Playing within reasonable time limits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Maintaining a healthy balance with other life activities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Recognizing when gaming becomes problematic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Seeking help when needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Keeping fantasy cricket as entertainment, not an obsession</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Healthy Gaming Habits</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {healthyHabits.map((habit, idx) => {
                const Icon = habit.icon;
                return (
                  <Card key={idx}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Icon className="w-5 h-5 text-primary" />
                        {habit.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{habit.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Warning Signs of Problematic Gaming</h2>
            <Card className="border-yellow-500/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <CardTitle>Recognize the Signs</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you or someone you know experiences any of these signs, it may indicate problematic gaming behavior:
                </p>
                <ul className="space-y-2">
                  {warningSigns.map((sign, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground mt-4 font-semibold">
                  If you recognize multiple warning signs, please consider taking a break and seeking professional support.
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Self-Assessment Questions</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  Ask yourself these questions honestly to assess your gaming habits:
                </p>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="p-3 bg-muted/50 rounded">
                    <p className="font-semibold mb-1">1. Time Management</p>
                    <p>Do you spend more time on fantasy cricket than you intended?</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded">
                    <p className="font-semibold mb-1">2. Priority Balance</p>
                    <p>Has fantasy cricket caused you to neglect important responsibilities?</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded">
                    <p className="font-semibold mb-1">3. Emotional Impact</p>
                    <p>Do your fantasy cricket results significantly affect your mood?</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded">
                    <p className="font-semibold mb-1">4. Social Relationships</p>
                    <p>Has fantasy cricket interfered with your relationships or social life?</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded">
                    <p className="font-semibold mb-1">5. Control</p>
                    <p>Do you find it difficult to stop playing even when you want to?</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  If you answered "yes" to multiple questions, consider implementing time limits or taking a break.
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Tools and Controls</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  PENTRIX provides tools to help you maintain healthy gaming habits:
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Account Self-Exclusion</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      If you need a break, you can temporarily deactivate your account for a period of your choosing 
                      (7 days, 30 days, 90 days, or permanently).
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Contact support@pentrix.com to request self-exclusion.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Activity Monitoring</h3>
                    <p className="text-sm text-muted-foreground">
                      Review your account activity to track time spent and contests participated in. Use this data 
                      to make informed decisions about your gaming habits.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Notification Controls</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage your notification preferences to reduce distractions. You can disable non-essential 
                      notifications in your account settings.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Tips for Parents and Guardians</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  While PENTRIX is restricted to users 18+, parents should be aware of fantasy gaming:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Monitor your young adult children's gaming habits and time spent online</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Have open conversations about responsible gaming and healthy habits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Watch for warning signs of problematic gaming behavior</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Encourage balance between gaming, studies, work, and social activities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Report underage users to PENTRIX immediately</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Mental Health Resources</h2>
            <Card className="border-blue-500/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <CardTitle>Professional Support Services</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you are struggling with gaming behavior or mental health concerns, professional help is available:
                </p>
                <div className="space-y-4">
                  {resources.map((resource, idx) => (
                    <div key={idx} className="p-4 bg-muted/30 rounded-lg">
                      <h3 className="font-semibold mb-1">{resource.organization}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                      <div className="flex flex-col gap-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-primary" />
                          <span className="font-mono">{resource.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-primary" />
                          <span className="text-blue-600">{resource.website}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  <strong>Remember:</strong> Seeking help is a sign of strength, not weakness. Professional support 
                  can help you develop healthy gaming habits and address underlying concerns.
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
            <Card className="border-primary/50">
              <CardContent className="pt-6">
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    PENTRIX is committed to promoting responsible gaming and supporting the well-being of our community:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>We maintain strict age verification to prevent underage access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>We provide tools for self-exclusion and account management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>We monitor for problematic behavior patterns and reach out to users when concerned</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>We keep PENTRIX 100% free to eliminate financial risks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>We continuously educate our community about responsible gaming</span>
                    </li>
                  </ul>
                  <p className="font-semibold">
                    Your well-being is our priority. If you have concerns or need support, please contact us at 
                    support@pentrix.com
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  If you or someone you know needs support with gaming behavior or mental health, 
                  please reach out. Help is available.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:support@pentrix.com"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                  >
                    Contact Support
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Get in Touch
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
