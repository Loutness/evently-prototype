import { Link, useLocation } from "react-router-dom";
import { Calendar, Plus, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

import { useAuth } from "@/hooks/useAuth";

const allNavItems: NavItem[] = [
  {
    path: "/events",
    label: "Événements",
    icon: <Calendar className="w-6 h-6" />,
  },
  {
    path: "/create",
    label: "Ajouter",
    icon: <Plus className="w-6 h-6" />,
  },
  {
    path: "/profile",
    label: "Profil",
    icon: <User className="w-6 h-6" />,
  },
];

export default function BottomNav() {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = allNavItems.filter(item => {
    if (item.path === "/create" && user?.role !== "organizer") {
      return false;
    }
    return true;
  });

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border">
      <div className="flex items-center justify-around h-20 px-2 max-w-2xl mx-auto pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg transition-all duration-200 flex-1",
                isActive
                  ? "text-primary-600"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.icon}
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
