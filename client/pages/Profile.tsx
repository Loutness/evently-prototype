import { useNavigate, Link } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { User, LogOut, Heart, Clock, Settings, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  if (!user) {
    // Optional: Redirect if accessing profile while logged out, though AuthProvider might handle this if we add protected routes.
    // For now, let's just show a "Connectez-vous" state or redirect.
    navigate("/auth");
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="safe-top pt-6 pb-6 px-4 border-b border-border">
        <h1 className="text-3xl font-bold text-foreground">Mon Profil</h1>
      </div>

      {/* Profile Section */}
      <div className="px-4 py-8">
        {/* User Card */}
        <div className="bg-gradient-to-br from-primary-50 to-secondary/10 border border-primary-200 rounded-2xl p-6 mb-8 text-center relative overflow-hidden">
          <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg shadow-primary/20">
            {user.role === "organizer" ? "🏢" : "👤"}
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-1">{user.name}</h2>
          <p className="text-muted-foreground mb-4">{user.email}</p>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-primary-100 mb-4">
            {user.role === "organizer" ? <Shield className="w-4 h-4 text-secondary-600" /> : <User className="w-4 h-4 text-primary-600" />}
            <span className="text-sm font-medium text-foreground capitalize">{user.role === "organizer" ? "Organisateur" : "Participant"}</span>
          </div>

          <div>
            <button className="bg-primary-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors shadow-sm">
              Éditer le profil
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-accent mb-1">12</p>
            <p className="text-sm text-muted-foreground">Événements créés</p>
          </div>
          <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-secondary mb-1">28</p>
            <p className="text-sm text-muted-foreground">Événements favoris</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-3 mb-8">
          <Link
            to="#"
            className="flex items-center gap-3 p-4 bg-white border border-border rounded-xl hover:bg-muted/50 transition-colors"
          >
            <Heart className="w-5 h-5 text-accent" />
            <span className="font-semibold text-foreground flex-1">Mes événements favoris</span>
            <span className="text-muted-foreground">→</span>
          </Link>

          <Link
            to="#"
            className="flex items-center gap-3 p-4 bg-white border border-border rounded-xl hover:bg-muted/50 transition-colors"
          >
            <Clock className="w-5 h-5 text-secondary" />
            <span className="font-semibold text-foreground flex-1">Événements auxquels j'assiste</span>
            <span className="text-muted-foreground">→</span>
          </Link>

          <Link
            to="/notifications"
            className="flex items-center gap-3 p-4 bg-white border border-border rounded-xl hover:bg-muted/50 transition-colors"
          >
            <Settings className="w-5 h-5 text-primary-600" />
            <span className="font-semibold text-foreground flex-1">Paramètres</span>
            <span className="text-muted-foreground">→</span>
          </Link>
        </div>

        {/* About Section */}
        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <h3 className="font-bold text-blue-900 mb-2">À propos de vous</h3>
          <p className="text-sm text-blue-800 leading-relaxed">
            Membre depuis 6 mois • Localisation: Paris, France
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-destructive text-white font-semibold py-3 rounded-xl hover:bg-destructive/90 transition-colors shadow-lg shadow-destructive/20"
        >
          <LogOut className="w-5 h-5" />
          Déconnexion
        </button>
      </div>

      <div className="safe-bottom" />
      <BottomNav />
    </div>
  );
}
