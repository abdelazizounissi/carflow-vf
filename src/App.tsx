
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CarsProvider } from "@/hooks/useCars";
import ScrollToTop from "@/components/ui/ScrollToTop";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Cars from "./pages/Cars";
import CarDetail from "./pages/CarDetail";
import Reservations from "./pages/Reservations";
import AgencyReservations from "./pages/AgencyReservations";
import AgencyCars from "./pages/AgencyCars";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminVehicles from "./pages/admin/AdminVehicles";
import AdminValidation from "./pages/admin/AdminValidation";
import AdminMediation from "./pages/admin/AdminMediation";
import AdminMonitoring from "./pages/admin/AdminMonitoring";

// Configure QueryClient with better caching options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      refetchOnWindowFocus: false,
      retry: 1
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <CarsProvider>
            <Toaster />
            <Sonner />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cars" element={<Cars />} />
              <Route path="/cars/:id" element={<CarDetail />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/agency/reservations" element={<AgencyReservations />} />
              <Route path="/agency/cars" element={<AgencyCars />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/vehicles" element={<AdminVehicles />} />
              <Route path="/admin/validation" element={<AdminValidation />} />
              <Route path="/admin/mediation" element={<AdminMediation />} />
              <Route path="/admin/monitoring" element={<AdminMonitoring />} />
              <Route path="/admin/delete-vehicles" element={<AdminVehicles />} />
              <Route path="/admin/updates" element={<AdminMonitoring />} />
              <Route path="/admin/errors" element={<AdminMonitoring />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CarsProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
