
import { ReactNode } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Car, 
  CheckSquare, 
  Trash2, 
  Monitor, 
  Cog, 
  Bug, 
  ChevronLeft, 
  Menu 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const { user, userType } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Protect admin routes
    if (!user || userType !== "admin") {
      navigate("/login");
    }
  }, [user, userType, navigate]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navItems = [
    {
      title: "Vue globale des réservations",
      icon: LayoutDashboard,
      path: "/admin/dashboard"
    },
    {
      title: "Médiation client-agence",
      icon: Users,
      path: "/admin/mediation"
    },
    {
      title: "Gestion véhicules",
      icon: Car,
      path: "/admin/vehicles"
    },
    {
      title: "Validation véhicules",
      icon: CheckSquare,
      path: "/admin/validation"
    },
    {
      title: "Suppression véhicules non conformes",
      icon: Trash2,
      path: "/admin/delete-vehicles"
    },
    {
      title: "Interface de monitoring",
      icon: Monitor,
      path: "/admin/monitoring"
    },
    {
      title: "Gestion des mises à jour",
      icon: Cog,
      path: "/admin/updates"
    },
    {
      title: "Corrections des erreurs",
      icon: Bug,
      path: "/admin/errors"
    },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-black text-white transition-all duration-300 flex flex-col",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        <div className="p-4 flex items-center">
          <Link to="/" className={cn("flex items-center justify-center gap-2", !sidebarOpen && "justify-center")}>
            <img alt="Car Flow Logo" className="h-8 w-8" src="/logo.svg" />
            {sidebarOpen && <span className="text-xl font-bold text-green-500">CarFlow</span>}
          </Link>
          <Button 
            variant="ghost" 
            size="icon"
            className="ml-auto text-white hover:bg-gray-800"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        <div className="mt-8 flex-1">
          <nav>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path}
                    className={cn(
                      "flex items-center px-4 py-3 hover:bg-gray-800",
                      window.location.pathname === item.path && "bg-gray-800 border-l-4 border-green-500"
                    )}
                  >
                    <item.icon size={20} className="text-green-500" />
                    {sidebarOpen && <span className="ml-3">{item.title}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-100 border-b p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{title}</h1>
            {user && (
              <div className="text-sm">
                Connecté en tant que <span className="font-semibold">{user.name}</span>
              </div>
            )}
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
