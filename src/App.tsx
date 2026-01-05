import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicLayout } from "./components/PublicLayout";
import HomePage from "./pages/HomePage";
import ChiSiamoPage from "./pages/ChiSiamoPage";
import ServiziPage from "./pages/ServiziPage";
import PrenotaPage from "./pages/PrenotaPage";
import ContattiPage from "./pages/ContattiPage";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardOggi from "./pages/dashboard/DashboardOggi";
import DashboardClienti from "./pages/dashboard/DashboardClienti";
import DashboardAppuntamenti from "./pages/dashboard/DashboardAppuntamenti";
import DashboardCartelle from "./pages/dashboard/DashboardCartelle";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/chi-siamo" element={<ChiSiamoPage />} />
            <Route path="/servizi" element={<ServiziPage />} />
            <Route path="/prenota" element={<PrenotaPage />} />
            <Route path="/contatti" element={<ContattiPage />} />
          </Route>
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOggi />} />
            <Route path="clienti" element={<DashboardClienti />} />
            <Route path="appuntamenti" element={<DashboardAppuntamenti />} />
            <Route path="cartelle" element={<DashboardCartelle />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
