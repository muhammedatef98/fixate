import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import AIChatbot from "./components/AIChatbot";
import StickyDownloadBar from "./components/StickyDownloadBar";
import CookieConsent from "./components/CookieConsent";

// ── Eagerly loaded: marketing pages shown to all visitors ─────────────────────
import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import AboutUs from "./pages/AboutUs";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import FixateMarket from "./pages/FixateMarket";
import NotFound from "./pages/NotFound";

// ── Lazily loaded: feature / internal pages ────────────────────────────────────
// These are never seen by a first-time marketing visitor so they should NOT
// inflate the initial JS bundle.
const Calculator = lazy(() => import("./pages/Calculator"));
const BookingComingSoon = lazy(() => import("./pages/BookingComingSoon"));
const ServiceLanding = lazy(() => import("./pages/ServiceLanding"));
const CityLanding = lazy(() => import("./pages/CityLanding"));
const Contact = lazy(() => import("./pages/Contact"));

// Minimal full-screen loading shell shown while a lazy chunk loads
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {/* ── Marketing pages ─────────────────────────────── */}
        <Route path="/" component={Home} />
        <Route path="/faq" component={FAQ} />
        <Route path="/about" component={AboutUs} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/market" component={FixateMarket} />
        <Route path="/price-calculator" component={FixateMarket} />
        <Route path="/services/:slug" component={ServiceLanding} />
        <Route path="/cities/:slug" component={CityLanding} />
        <Route path="/contact" component={Contact} />
        {/* ── Feature / internal pages ────────────────────── */}
        <Route path="/calculator" component={Calculator} />
        <Route path="/request" component={BookingComingSoon} />
        <Route path="/booking" component={BookingComingSoon} />
        <Route path="/booking-old" component={BookingComingSoon} />
        {/* Legacy web-app flows now live in the mobile app — old bookmarks
            land on the app-download page instead of a stale parallel product. */}
        <Route path="/my-requests" component={BookingComingSoon} />
        <Route path="/track" component={BookingComingSoon} />
        <Route path="/track-order/:id" component={BookingComingSoon} />
        <Route path="/chat" component={BookingComingSoon} />
        <Route path="/loyalty" component={BookingComingSoon} />
        <Route path="/payment" component={BookingComingSoon} />
        <Route path="/login" component={BookingComingSoon} />
        <Route path="/signup" component={BookingComingSoon} />
        <Route path="/signup-new" component={BookingComingSoon} />
        <Route path="/profile" component={BookingComingSoon} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider defaultTheme="light" switchable>
          <TooltipProvider>
            <Toaster />
            <Router />
            <AIChatbot />
            <StickyDownloadBar />
            <CookieConsent />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
