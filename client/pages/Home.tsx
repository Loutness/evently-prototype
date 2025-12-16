import { Link } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { useEvents } from "@/hooks/useEvents";
import { getCategoryInfo } from "@/lib/mockEvents";
import { MapPin, Users, Clock, ChevronRight } from "lucide-react";

export default function Home() {
  const { events } = useEvents();
  // Get nearby and popular events (first 3)
  const nearbyEvents = events.slice(0, 3).sort((a, b) => a.distance - b.distance);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary/5 safe-bottom">
      {/* Header */}
      <div className="safe-top pt-12 pb-8 px-4">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Evently
        </h1>
        <p className="text-muted-foreground">Découvrez des événements près de vous</p>
      </div>

      {/* Hero Section */}
      <div className="px-4 mb-8">
        <div className="gradient-primary rounded-2xl p-6 text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Prêt à découvrir?</h2>
          <p className="text-primary-100 mb-4">
            Explorez les événements populaires et proches de votre localisation
          </p>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold px-6 py-3 rounded-xl hover:bg-primary-50 transition-colors"
          >
            Voir tous les événements
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Popular Events Section */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-foreground">Événements proches</h3>
          <Link
            to="/events"
            className="text-primary-600 font-semibold text-sm hover:text-primary-700"
          >
            Voir plus →
          </Link>
        </div>

        <div className="space-y-4">
          {nearbyEvents.map((event) => {
            const categoryInfo = getCategoryInfo(event.category);
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString("fr-FR", {
              weekday: "short",
              month: "short",
              day: "numeric",
            });

            return (
              <Link
                key={event.id}
                to={`/event/${event.id}`}
                className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all hover:border-primary-200 border border-transparent"
              >
                <div className="flex gap-4">
                  {/* Category Badge */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${categoryInfo?.color} flex items-center justify-center text-3xl flex-shrink-0`}>
                    {categoryInfo?.icon}
                  </div>

                  {/* Event Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground line-clamp-1 mb-1 group-hover:text-primary-600">
                      {event.title}
                    </h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{formattedDate} à {event.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{event.distance.toFixed(1)}km</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees} participants</span>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center justify-center">
                    <ChevronRight className="w-5 h-5 text-primary-300 group-hover:text-primary-600 transition-colors" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-8">
        <h3 className="text-lg font-bold text-foreground mb-4">Actions rapides</h3>
        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/create"
            className="bg-accent text-white rounded-xl p-4 text-center font-semibold hover:bg-accent/90 transition-colors shadow-sm"
          >
            + Créer un événement
          </Link>
          <Link
            to="/notifications"
            className="bg-secondary text-white rounded-xl p-4 text-center font-semibold hover:bg-secondary/90 transition-colors shadow-sm"
          >
            🔔 Notifications
          </Link>
        </div>
      </div>

      {/* Info Section */}
      <div className="px-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="font-semibold text-blue-900 mb-2">💡 Conseil</h4>
          <p className="text-sm text-blue-800">
            Personnalisez votre expérience en accédant aux filtres et paramètres depuis la page des événements.
          </p>
        </div>
      </div>
    </div>
  );
}
