import { useState } from 'react';
import { Link } from 'wouter';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock } from 'lucide-react';

export default function Matches() {
  const [activeTab, setActiveTab] = useState('live');
  
  const { data: liveMatches, isLoading: loadingLive } = trpc.matches.getMatchesByStatus.useQuery({ status: 'live' });
  const { data: upcomingMatches, isLoading: loadingUpcoming } = trpc.matches.getUpcomingMatches.useQuery();
  const { data: completedMatches, isLoading: loadingCompleted } = trpc.matches.getMatchesByStatus.useQuery({ status: 'completed' });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const MatchCard = ({ match, type }: { match: any; type: 'live' | 'upcoming' | 'completed' }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge 
              variant={type === 'live' ? 'destructive' : type === 'upcoming' ? 'default' : 'secondary'}
              className={type === 'live' ? 'bg-red-500 animate-pulse' : ''}
            >
              {type === 'live' ? 'LIVE' : type === 'upcoming' ? 'Upcoming' : 'Completed'}
            </Badge>
            <Badge variant="outline" className="uppercase">
              {match.matchType}
            </Badge>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-4">{match.name}</h3>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {match.teamInfo?.map((team: any, idx: number) => (
            <div key={idx} className="flex items-center gap-3">
              {team.img && (
                <img 
                  src={team.img} 
                  alt={team.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{team.name}</p>
                {match.score && match.score[idx] && (
                  <p className="text-sm text-muted-foreground">
                    {match.score[idx].r}/{match.score[idx].w} ({match.score[idx].o})
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{match.venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(match.dateTimeGMT)}</span>
            <Clock className="w-4 h-4 ml-2" />
            <span>{formatTime(match.dateTimeGMT)}</span>
          </div>
        </div>

        {match.status && (
          <p className="text-sm text-muted-foreground mb-4 italic">{match.status}</p>
        )}

        <Button asChild className="w-full">
          <Link href={`/match/${match.id}`}>
            {type === 'live' ? 'View Live Match' : type === 'upcoming' ? 'Create Team' : 'View Scorecard'}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Cricket Matches</h1>
          <p className="text-lg opacity-90">
            Browse live, upcoming, and completed cricket matches
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="live">
              Live Matches
              {liveMatches?.matches && liveMatches.matches.length > 0 && (
                <Badge variant="destructive" className="ml-2 bg-red-500">
                  {liveMatches.matches.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="upcoming">
              Upcoming
              {upcomingMatches?.matches && upcomingMatches.matches.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {upcomingMatches.matches.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-6">
            {loadingLive ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading live matches...</p>
              </div>
            ) : liveMatches?.matches && liveMatches.matches.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {liveMatches.matches.map((match: any) => (
                  <MatchCard key={match.id} match={match} type="live" />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No live matches at the moment</p>
                <Button asChild variant="outline">
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6">
            {loadingUpcoming ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading upcoming matches...</p>
              </div>
            ) : upcomingMatches?.matches && upcomingMatches.matches.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upcomingMatches.matches.map((match: any) => (
                  <MatchCard key={match.id} match={match} type="upcoming" />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No upcoming matches found</p>
                <Button asChild variant="outline">
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {loadingCompleted ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading completed matches...</p>
              </div>
            ) : completedMatches?.matches && completedMatches.matches.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {completedMatches.matches.map((match: any) => (
                  <MatchCard key={match.id} match={match} type="completed" />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No completed matches found</p>
                <Button asChild variant="outline">
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
