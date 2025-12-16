import { useParams, Link } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { useEvents } from "@/hooks/useEvents";
import { getCategoryInfo } from "@/lib/mockEvents";
import { MapPin, Users, Clock, Share2, Check, ArrowLeft, AlertCircle } from "lucide-react";

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const { events, joinEvent, isParticipating } = useEvents();
  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-4">
          <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-xl font-bold text-foreground mb-2">Événement non trouvé</h1>
          <p className="text-muted-foreground mb-6">
            L'événement que vous recherchez n'existe pas.
          </p>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour aux événements
          </Link>
        </div>
      </div>
    );
  }

  const categoryInfo = getCategoryInfo(event.category);
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const participating = isParticipating(event.id);

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-40 bg-white border-b border-border safe-top pt-4 pb-4 px-4 flex items-center gap-3">
        <Link
          to="/events"
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-bold text-foreground">Détail de l'événement</h1>
      </div>

      {/* Category Badge Hero */}
      <div className={`bg-gradient-to-br ${categoryInfo?.color} h-48 flex items-center justify-center text-7xl`}>
        {categoryInfo?.icon}
      </div>

      {/* Event Content */}
      <div className="px-4 py-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-foreground mb-2">{event.title}</h1>
        <p className="text-muted-foreground mb-6">{event.category && getCategoryInfo(event.category)?.name}</p>

        {/* Key Information Cards */}
        <div className="space-y-3 mb-6">
          {/* Date & Time */}
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Clock className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-muted-foreground font-medium">Date et heure</p>
                <p className="text-lg font-semibold text-foreground">{formattedDate}</p>
                <p className="text-primary-600 font-semibold">{event.time}</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-muted-foreground font-medium">Lieu</p>
                <p className="text-lg font-semibold text-foreground">{event.location}</p>
                <p className="text-secondary-600 font-semibold">{event.distance.toFixed(1)}km de votre position</p>
              </div>
            </div>
          </div>

          {/* Participants */}
          <div className="bg-accent/10 border border-accent/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Users className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-muted-foreground font-medium">Participants</p>
                <p className="text-lg font-semibold text-foreground">{event.attendees + (participating ? 1 : 0)} personnes inscrites</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-foreground mb-3">À propos de cet événement</h2>
          <p className="text-foreground leading-relaxed">{event.description}</p>
        </div>

        {/* Organizer */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-foreground mb-3">Organisateur</h2>
          <div className="bg-muted rounded-xl p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
              {event.organizer.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-foreground">{event.organizer}</p>
              <p className="text-sm text-muted-foreground">Organisateur vérifié</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-4">
          <button
            onClick={() => joinEvent(event.id)}
            className={`w-full font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${participating
                ? "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/30"
                : "bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary/30"
              }`}
          >
            {participating ? (
              <>
                <Check className="w-5 h-5" />
                Inscrit
              </>
            ) : (
              <>
                <Users className="w-5 h-5" />
                Participer
              </>
            )}
          </button>

          <button className="w-full bg-muted text-foreground font-semibold py-4 rounded-xl hover:bg-muted/80 transition-colors flex items-center justify-center gap-2">
            <Share2 className="w-5 h-5" />
            Partager l'événement
          </button>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-900">
            💡 <strong>Conseil:</strong> Ajoutez cet événement à votre calendrier pour ne pas le manquer!
          </p>
        </div>
      </div>

      <div className="safe-bottom" />
      <BottomNav />
    </div>
  );
}
