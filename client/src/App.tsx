import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import PriceCalculator from "./pages/PriceCalculator";
import ServiceRequest from "./pages/ServiceRequest";
import MyRequests from "./pages/MyRequests";
import AdminDashboard from "./pages/AdminDashboard";
import TechnicianDashboard from "./pages/TechnicianDashboard";
import CouponsManagement from "./pages/CouponsManagement";
import TrackTechnician from "./pages/TrackTechnician";
import Chat from "./pages/Chat";
import Analytics from "./pages/Analytics";
import LoyaltyPoints from "./pages/LoyaltyPoints";
import Payment from "./pages/Payment";
import AboutUs from "./pages/AboutUs";
import FAQ from "./pages/FAQ";
import TrackOrder from "./pages/TrackOrder";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SignupNew from "./pages/SignupNew";
import TechnicianDashboardWeb from "./pages/TechnicianDashboardWeb";
import TechniciansList from "./pages/TechniciansList";
import Profile from "./pages/Profile";
import AIChatbot from "./components/AIChatbot";
// PWA removed

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path="/calculator" component={Calculator} />
      <Route path="/price-calculator" component={PriceCalculator} />
      <Route path="/request" component={ServiceRequest} />
      <Route path="/my-requests" component={MyRequests} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/coupons" component={CouponsManagement} />
      <Route path="/technician" component={TechnicianDashboard} />
      <Route path="/track" component={TrackTechnician} />
      <Route path="/chat" component={Chat} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/loyalty" component={LoyaltyPoints} />
      <Route path="/payment" component={Payment} />
      <Route path="/about" component={AboutUs} />
      <Route path="/faq" component={FAQ} />
      <Route path="/track-order/:id" component={TrackOrder} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/signup-new" component={SignupNew} />
      <Route path="/technician-dashboard" component={TechnicianDashboardWeb} />
      <Route path="/technicians" component={TechniciansList} />
      <Route path="/profile" component={Profile} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
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
      <LanguageProvider>
        <ThemeProvider
          defaultTheme="light"
          switchable
        >
          <TooltipProvider>
            <Toaster />
            <Router />
            <AIChatbot />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
