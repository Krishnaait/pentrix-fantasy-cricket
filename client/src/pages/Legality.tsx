import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle, AlertTriangle, Scale } from 'lucide-react';
import Footer from '@/components/Footer';

export default function Legality() {
  const allowedStates = [
    'Andaman and Nicobar Islands', 'Andhra Pradesh (Restricted)', 'Arunachal Pradesh',
    'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir',
    'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Odisha (Restricted)',
    'Puducherry', 'Punjab', 'Rajasthan', 'Tamil Nadu (Restricted)', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const restrictedStates = [
    'Assam', 'Nagaland', 'Sikkim', 'Telangana',
    'Andhra Pradesh', 'Odisha', 'Tamil Nadu'
  ];

  return (
    <>
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-2">
            <Scale className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Legality & Compliance</h1>
          </div>
          <p className="text-lg opacity-90">
            Understanding the legal framework of fantasy sports in India
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Important Notice */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> PENTRIX is a game of skill and complies with Indian laws. 
              However, availability is restricted in certain states due to local regulations.
            </AlertDescription>
          </Alert>

          {/* Legal Framework */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Legal Framework in India</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <h3 className="text-lg font-semibold mb-3">Fantasy Sports as a Game of Skill</h3>
              <p className="text-muted-foreground mb-4">
                Fantasy sports platforms like PENTRIX are recognized as <strong>games of skill</strong> under Indian law, 
                as distinguished from games of chance. The legality of fantasy sports in India is based on several key principles:
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Skill-Based Gameplay</h4>
                    <p className="text-sm text-muted-foreground">
                      Success in fantasy cricket depends on players' knowledge of the game, statistical analysis, 
                      and strategic decision-making, not on chance or luck.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Supreme Court Recognition</h4>
                    <p className="text-sm text-muted-foreground">
                      The Supreme Court of India has recognized that games where success depends substantially 
                      on superior knowledge and skill are not gambling.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Free-to-Play Model</h4>
                    <p className="text-sm text-muted-foreground">
                      PENTRIX operates as a 100% free-to-play platform with no entry fees or monetary prizes, 
                      focusing purely on entertainment and skill development.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-3">Regulatory Compliance</h3>
              <p className="text-muted-foreground mb-4">
                PENTRIX ZONE PRIVATE LIMITED (CIN: U74999TN2018PTC124738) is a registered company 
                operating in full compliance with applicable Indian laws and regulations:
              </p>

              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Registered under the Companies Act, 2013</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>GST Registration: 33AAKCP1307J1ZL</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Compliant with Information Technology Act, 2000</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Adherence to data protection and privacy regulations</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Geographic Restrictions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Geographic Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <h3 className="text-lg font-semibold">Restricted States</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    PENTRIX is <strong>NOT available</strong> in the following states due to local regulations:
                  </p>
                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg p-4">
                    <ul className="grid grid-cols-2 gap-2 text-sm">
                      {restrictedStates.map((state) => (
                        <li key={state} className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                          <span>{state}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-semibold">Available Across India</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    PENTRIX is available in all other Indian states and union territories where fantasy sports are permitted.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Age Restriction */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Age Restriction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">18+ Only</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Only individuals who are <strong>18 years of age or older</strong> are permitted to register 
                    and participate on PENTRIX. Age verification is mandatory during registration.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We take age verification seriously and may request additional documentation to verify user age. 
                    Accounts found to be in violation of this policy will be immediately suspended.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="border-primary/50">
            <CardHeader>
              <CardTitle className="text-2xl">Legal Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>
                This page provides general information about the legal status of fantasy sports in India. 
                It is not intended as legal advice. Users are responsible for understanding and complying 
                with their local laws and regulations.
              </p>
              <p>
                PENTRIX reserves the right to restrict access to users from any jurisdiction where the 
                operation of fantasy sports platforms may be prohibited or restricted by law.
              </p>
              <p>
                By using PENTRIX, you acknowledge that you have read, understood, and agree to comply with 
                all applicable laws and regulations in your jurisdiction.
              </p>
              <p className="font-semibold">
                For questions about legality or compliance, please contact us at{' '}
                <a href="mailto:legal@pentrix.com" className="text-primary hover:underline">
                  legal@pentrix.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  
      <Footer />
    </>
  );
}
