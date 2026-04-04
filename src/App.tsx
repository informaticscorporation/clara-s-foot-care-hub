import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicLayout } from "./components/PublicLayout";
import { ScrollToTop } from "./components/ScrollToTop";

const HomePage = lazy(() => import("./pages/HomePage"));
const ChiSiamoPage = lazy(() => import("./pages/ChiSiamoPage"));
const ServiziPage = lazy(() => import("./pages/ServiziPage"));
const PrenotaPage = lazy(() => import("./pages/PrenotaPage"));
const ContattiPage = lazy(() => import("./pages/ContattiPage"));
const DashboardLayout = lazy(() => import("./pages/dashboard/DashboardLayout"));
const DashboardOggi = lazy(() => import("./pages/dashboard/DashboardOggi"));
const DashboardClienti = lazy(() => import("./pages/dashboard/DashboardClienti"));
const DashboardAppuntamenti = lazy(() => import("./pages/dashboard/DashboardAppuntamenti"));
const DashboardCartelle = lazy(() => import("./pages/dashboard/DashboardCartelle"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
