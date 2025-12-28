import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
// Public pages
import Home from "./pages/Home";
import About from "./pages/About";
import HowToPlay from "./pages/HowToPlay";
import FAQs from "./pages/FAQs";

// Legal pages
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import ResponsibleGaming from "./pages/ResponsibleGaming";
import FairPlay from "./pages/FairPlay";
import Legality from "./pages/Legality";
import RefundPolicy from "./pages/RefundPolicy";
import ContactUs from "./pages/ContactUs";

// Auth pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

// Dashboard pages
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

// Fantasy flow pages
import Matches from "./pages/Matches";
import MatchDetails from "./pages/MatchDetails";
import Contests from "./pages/Contests";
import CreateTeam from "./pages/CreateTeam";
import MyTeams from "./pages/MyTeams";
import TeamDetails from "./pages/TeamDetails";

// Leaderboard pages
import Leaderboard from "./pages/Leaderboard";
import Results from "./pages/Results";

function Router() {
  return (
    <Switch>
      {/* Public pages */}
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/how-to-play" component={HowToPlay} />
      <Route path="/faqs" component={FAQs} />

      {/* Legal pages */}
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/responsible-gaming" component={ResponsibleGaming} />
      <Route path="/fair-play" component={FairPlay} />
      <Route path="/legality" component={Legality} />
      <Route path="/refund-policy" component={RefundPolicy} />
      <Route path="/contact" component={ContactUs} />

      {/* Auth pages */}
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/forgot-password" component={ForgotPassword} />

      {/* Dashboard */}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/profile" component={Profile} />

      {/* Fantasy flow */}
      <Route path="/matches" component={Matches} />
      <Route path="/match/:id" component={MatchDetails} />
      <Route path="/contests" component={Contests} />
      <Route path="/create-team/:matchId" component={CreateTeam} />
      <Route path="/my-teams" component={MyTeams} />
      <Route path="/team/:id" component={TeamDetails} />

      {/* Leaderboard */}
      <Route path="/leaderboard/:contestId" component={Leaderboard} />
      <Route path="/results" component={Results} />

      {/* 404 */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
