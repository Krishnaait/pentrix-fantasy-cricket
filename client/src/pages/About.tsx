import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Eye, Heart, Users, Trophy, Shield, Lightbulb, Globe, TrendingUp, Award } from 'lucide-react';
import Footer from '@/components/Footer';

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Cricket',
      description: 'We live and breathe cricket. Our team comprises cricket enthusiasts who understand the game deeply and share your love for every boundary, wicket, and strategic move.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'PENTRIX is built by fans, for fans. We prioritize community feedback, foster healthy competition, and create a welcoming environment for cricket lovers of all skill levels.'
    },
    {
      icon: Shield,
      title: 'Fair Play & Integrity',
      description: 'We maintain the highest standards of fairness and transparency. Our platform uses verified data sources, implements strict anti-cheating measures, and ensures every user competes on equal footing.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation & Excellence',
      description: 'We continuously innovate to enhance your fantasy cricket experience. From real-time scoring to advanced analytics, we leverage technology to deliver excellence.'
    },
    {
      icon: Globe,
      title: 'Accessibility for All',
      description: 'By keeping PENTRIX 100% free-to-play, we remove financial barriers and make fantasy cricket accessible to millions of Indians who love the sport.'
    },
    {
      icon: TrendingUp,
      title: 'Continuous Improvement',
      description: 'We listen to our community and evolve constantly. Your feedback shapes our roadmap, and we are committed to delivering features that enhance your experience.'
    }
  ];

  const milestones = [
    {
      year: '2024',
      title: 'The Beginning',
      description: 'PENTRIX was founded with a simple mission: make fantasy cricket accessible to every Indian cricket fan, regardless of their financial situation.'
    },
    {
      year: '2025',
      title: 'Platform Launch',
      description: 'After months of development and testing, we launched PENTRIX as India first truly free-to-play fantasy cricket platform with no hidden costs.'
    },
    {
      year: '2025',
      title: 'Growing Community',
      description: 'Thousands of cricket fans joined PENTRIX, creating teams, competing in contests, and proving that fantasy cricket is about skill and passion, not money.'
    },
    {
      year: 'Future',
      title: 'Building the Future',
      description: 'We are working on exciting features: advanced analytics, social leagues, expert tips, and more. Our goal is to become India largest fantasy cricket community.'
    }
  ];

  return (
    <>
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">About PENTRIX</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            India's premier free-to-play fantasy cricket platform, built by cricket fans for cricket fans
          </p>
        </div>
      </div>

      <div className="container py-12 space-y-16">
        <section>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                PENTRIX was born from a simple observation: fantasy cricket in India had become increasingly commercialized, 
                with high entry fees creating barriers for millions of passionate cricket fans who wanted to test their skills 
                and knowledge of the game.
              </p>
              <p>
                We asked ourselves: Why should financial capability determine who gets to play fantasy cricket? 
                Cricket is India's passion, and fantasy cricket should be about skill, strategy, and love for the game—not about 
                how much money you can afford to spend.
              </p>
              <p>
                That's when PENTRIX was conceived. We set out to build a platform that would be 100% free-to-play, 
                with no entry fees, no hidden costs, and no monetary prizes. Instead, we focus on what truly matters: the thrill 
                of competition, the joy of strategic team building, and the satisfaction of seeing your cricket knowledge pay off.
              </p>
              <p>
                Today, PENTRIX serves thousands of cricket enthusiasts across India who share our vision. We're building more than 
                just a platform—we're building a community of cricket lovers who compete for glory, bragging rights, and the pure 
                joy of the game.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-12 rounded-lg">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="w-8 h-8 text-primary" />
                    <CardTitle className="text-2xl">Our Mission</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    To democratize fantasy cricket in India by providing a completely free, fair, and engaging platform 
                    where every cricket fan—regardless of their financial situation—can test their skills, compete with 
                    others, and celebrate their love for the game.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Eye className="w-8 h-8 text-primary" />
                    <CardTitle className="text-2xl">Our Vision</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    To become India's largest and most trusted fantasy cricket community, where millions of fans come 
                    together to showcase their cricket knowledge, engage in friendly competition, and experience the joy 
                    of fantasy sports without financial barriers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, idx) => {
                const Icon = value.icon;
                return (
                  <Card key={idx} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{value.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
            <div className="space-y-6">
              {milestones.map((milestone, idx) => (
                <Card key={idx} className="border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        {milestone.year}
                      </Badge>
                      <CardTitle>{milestone.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join the PENTRIX Community</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you're a casual cricket fan or a fantasy sports veteran, PENTRIX welcomes you. 
              Create your account today and start competing with thousands of cricket enthusiasts across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register"
                className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Get Started Free
              </a>
              <a
                href="/how-to-play"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Learn How to Play
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  
      <Footer />
    </>
  );
}
