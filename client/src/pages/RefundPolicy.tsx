import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, CheckCircle2 } from 'lucide-react';
import Footer from '@/components/Footer';

export default function RefundPolicy() {
  return (
    <>
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Refund Policy</h1>
          <p className="text-lg opacity-90">
            Understanding our refund and cancellation policy
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Important Notice */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> PENTRIX is a 100% free-to-play platform. Since there are no entry fees 
              or monetary transactions, traditional refund scenarios do not apply.
            </AlertDescription>
          </Alert>

          {/* Free-to-Play Model */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Free-to-Play Model</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                PENTRIX operates as a completely free-to-play fantasy cricket platform. This means:
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">No Entry Fees</h3>
                    <p className="text-sm text-muted-foreground">
                      All contests and matches are free to join. You never pay to participate.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">No Hidden Charges</h3>
                    <p className="text-sm text-muted-foreground">
                      There are no subscription fees, premium features, or hidden costs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">No Monetary Prizes</h3>
                    <p className="text-sm text-muted-foreground">
                      PENTRIX focuses on entertainment and skill development, not monetary winnings.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Cancellation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Account Cancellation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-semibold">User-Initiated Cancellation</h3>
              <p className="text-muted-foreground mb-4">
                You may request to close your PENTRIX account at any time by contacting our support team at{' '}
                <a href="mailto:support@pentrix.com" className="text-primary hover:underline">
                  support@pentrix.com
                </a>
              </p>

              <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
                <p className="font-semibold">What happens when you close your account:</p>
                <ul className="space-y-1 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Your profile and personal information will be deleted</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>All your teams and contest entries will be removed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Your account history will be archived for legal compliance (90 days)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>You will no longer receive emails or notifications from PENTRIX</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold mt-6">Platform-Initiated Suspension</h3>
              <p className="text-muted-foreground">
                PENTRIX reserves the right to suspend or terminate accounts that violate our{' '}
                <a href="/terms" className="text-primary hover:underline">Terms of Service</a> or{' '}
                <a href="/fair-play" className="text-primary hover:underline">Fair Play Policy</a>. 
                This includes but is not limited to:
              </p>

              <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Creating multiple accounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Using automated bots or scripts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Engaging in fraudulent activities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Harassment or abusive behavior</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Being under 18 years of age</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Contest Cancellation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Contest Cancellation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-semibold">Match Cancellation or Postponement</h3>
              <p className="text-muted-foreground mb-4">
                If a cricket match is cancelled, postponed, or abandoned:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Before Match Starts</h4>
                    <p className="text-sm text-muted-foreground">
                      All associated contests will be automatically cancelled. Your team entries will be removed, 
                      and you can create new teams for other matches.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">After Match Starts</h4>
                    <p className="text-sm text-muted-foreground">
                      If a match is abandoned after it starts, contests will be evaluated based on official 
                      cricket rules and the points scored until abandonment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Rescheduled Matches</h4>
                    <p className="text-sm text-muted-foreground">
                      If a match is rescheduled, existing team entries may remain valid if the match occurs 
                      within 48 hours. Otherwise, contests will be cancelled.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                After account closure or cancellation:
              </p>

              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Personal Data:</strong> Deleted within 30 days, except where retention is required by law
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Transaction Logs:</strong> Retained for 90 days for audit and compliance purposes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Anonymized Data:</strong> May be retained indefinitely for analytics and platform improvement
                  </span>
                </li>
              </ul>

              <p className="text-sm text-muted-foreground mt-4">
                For more information about how we handle your data, please review our{' '}
                <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="border-primary/50">
            <CardHeader>
              <CardTitle className="text-2xl">Questions or Concerns?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have questions about this refund policy, account cancellation, or any other concerns, 
                please don't hesitate to contact us:
              </p>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="font-semibold mb-2">Contact Support</p>
                <p className="text-sm text-muted-foreground mb-1">
                  Email:{' '}
                  <a href="mailto:support@pentrix.com" className="text-primary hover:underline">
                    support@pentrix.com
                  </a>
                </p>
                <p className="text-sm text-muted-foreground">
                  Response Time: Within 24-48 hours during business days
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Last Updated */}
          <div className="text-center text-sm text-muted-foreground">
            <p>Last Updated: December 28, 2025</p>
            <p className="mt-2">
              PENTRIX ZONE PRIVATE LIMITED | CIN: U74999TN2018PTC124738
            </p>
          </div>
        </div>
      </div>
    </div>
  
      <Footer />
    </>
  );
}
