import { Outlet, Link, useLocation } from "react-router-dom";
import { FootLogo } from "@/components/FootLogo";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FolderOpen,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Oggi" },
  { href: "/dashboard/clienti", icon: Users, label: "Clienti" },
  { href: "/dashboard/appuntamenti", icon: Calendar, label: "Appuntamenti" },
  { href: "/dashboard/cartelle", icon: FolderOpen, label: "Cartelle Cliniche" },
];

const DashboardLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar transform transition-transform duration-300 lg:relative lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-8">
            <FootLogo size="sm" />
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden neu-button p-2 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>
          
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href !== "/dashboard" && location.pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary neu-pressed"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  )}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          
          <div className="border-t border-sidebar-border pt-4 mt-4">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
            >
              <LogOut size={20} />
              <span>Torna al Sito</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-foreground/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-30 flex items-center px-4 lg:px-8">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden neu-button p-2 rounded-lg mr-4"
          >
            <Menu size={20} />
          </button>
          <h1 className="font-heading text-lg font-semibold text-foreground">
            Dashboard
          </h1>
        </header>
        
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
