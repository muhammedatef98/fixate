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
import PriceCalculator from "./pages/PriceCalculator";
import NotFound from "./pages/NotFound";

// ── Lazily loaded: feature / internal pages ────────────────────────────────────
// These are never seen by a first-time marketing visitor so they should NOT
// inflate the initial JS bundle.
const Calculator = lazy(() => import("./pages/Calculator"));
const ServiceRequest = lazy(() => import("./pages/ServiceRequest"));
const MyRequests = lazy(() => import("./pages/MyRequests"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const CouponsManagement = lazy(() => import("./pages/CouponsManagement"));
const TechnicianDashboard = lazy(() => import("./pages/TechnicianDashboard"));
const TechnicianDashboardWeb = lazy(() => import("./pages/TechnicianDashboardWeb"));
const TechniciansList = lazy(() => import("./pages/TechniciansList"));
const TrackTechnician = lazy(() => import("./pages/TrackTechnician"));
const TrackOrder = lazy(() => import("./pages/TrackOrder"));
const Chat = lazy(() => import("./pages/Chat"));
const Analytics = lazy(() => import("./pages/Analytics"));
const LoyaltyPoints = lazy(() => import("./pages/LoyaltyPoints"));
const Payment = lazy(() => import("./pages/Payment"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const SignupNew = lazy(() => import("./pages/SignupNew"));
const BookingForm = lazy(() => import("./pages/BookingForm"));
const NewBooking = lazy(() => import("./pages/NewBooking"));
const BookingComingSoon = lazy(() => import("./pages/BookingComingSoon"));
const Profile = lazy(() => import("./pages/Profile"));

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
        <Route path="/price-calculator" component={PriceCalculator} />
        {/* ── Feature / internal pages ────────────────────── */}
        <Route path="/calculator" component={Calculator} />
        <Route path="/request" component={BookingComingSoon} />
        <Route path="/booking" component={BookingComingSoon} />
        <Route path="/booking-old" component={BookingComingSoon} />
        <Route path="/my-requests" component={MyRequests} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/coupons" component={CouponsManagement} />
        <Route path="/technician" component={TechnicianDashboard} />
        <Route path="/technician-dashboard" component={TechnicianDashboardWeb} />
        <Route path="/technicians" component={TechniciansList} />
        <Route path="/track" component={TrackTechnician} />
        <Route path="/track-order/:id" component={TrackOrder} />
        <Route path="/chat" component={Chat} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/loyalty" component={LoyaltyPoints} />
        <Route path="/payment" component={Payment} />
        <Route path="/login" component={BookingComingSoon} />
        <Route path="/signup" component={BookingComingSoon} />
        <Route path="/signup-new" component={BookingComingSoon} />
        <Route path="/profile" component={Profile} />
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
