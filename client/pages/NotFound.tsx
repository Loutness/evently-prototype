import { Link, useLocation } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { AlertCircle, Home } from "lucide-react";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary/10 flex items-center justify-center">
      <div className="text-center px-4 py-8">
        <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-12 h-12 text-destructive" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
        <p className="text-xl text-muted-foreground mb-2">Page non trouvée</p>
        <p className="text-muted-foreground mb-8 max-w-md">
          La page que vous recherchez n'existe pas ou a été déplacée. Retournez à la page d'accueil pour continuer.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Home className="w-5 h-5" />
          Retour à l'accueil
        </Link>
      </div>
      <div className="safe-bottom" />
      <BottomNav />
    </div>
  );
};

export default NotFound;
