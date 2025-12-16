import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import { Bell, MapPin, Clock, Zap } from "lucide-react";

export default function Notifications() {
  const [notificationSettings, setNotificationSettings] = useState({
    enableNotifications: true,
    nearbyEvents: true,
    upcomingEvents: true,
    eventUpdates: true,
    radius: 10,
  });

  const handleToggle = (key: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: typeof prev[key] === "boolean" ? !prev[key] : prev[key],
    }));
  };

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationSettings((prev) => ({
      ...prev,
      radius: parseInt(e.target.value),
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="safe-top pt-6 pb-6 px-4 border-b border-border">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Bell className="w-8 h-8 text-accent" />
          Notifications
        </h1>
        <p className="text-muted-foreground mt-1">Gérez vos préférences de notifications</p>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Master Toggle */}
        <div className="mb-8">
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-primary-600" />
              <div>
                <h3 className="font-semibold text-foreground">Activer les notifications</h3>
                <p className="text-sm text-muted-foreground">Recevez des alertes pour vos événements</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle("enableNotifications")}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                notificationSettings.enableNotifications
                  ? "bg-primary-600"
                  : "bg-muted"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  notificationSettings.enableNotifications ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {notificationSettings.enableNotifications && (
          <>
            {/* Notification Types */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-foreground mb-4">Types de notifications</h2>
              <div className="space-y-3">
                {/* Nearby Events */}
                <div className="bg-white border border-border rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-secondary" />
                    <div>
                      <h3 className="font-semibold text-foreground">Événements à proximité</h3>
                      <p className="text-sm text-muted-foreground">
                        Soyez alerté des nouveaux événements près de vous
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle("nearbyEvents")}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                      notificationSettings.nearbyEvents
                        ? "bg-secondary"
                        : "bg-muted"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        notificationSettings.nearbyEvents
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Upcoming Events */}
                <div className="bg-white border border-border rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-accent" />
                    <div>
                      <h3 className="font-semibold text-foreground">Événements à venir</h3>
                      <p className="text-sm text-muted-foreground">
                        Rappels pour les événements auxquels vous êtes inscrit
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle("upcomingEvents")}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                      notificationSettings.upcomingEvents
                        ? "bg-accent"
                        : "bg-muted"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        notificationSettings.upcomingEvents
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Event Updates */}
                <div className="bg-white border border-border rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-6 h-6 text-muted-foreground" />
                    <div>
                      <h3 className="font-semibold text-foreground">Mises à jour d'événements</h3>
                      <p className="text-sm text-muted-foreground">
                        Notifications sur les modifications d'événements
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle("eventUpdates")}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                      notificationSettings.eventUpdates
                        ? "bg-primary-600"
                        : "bg-muted"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        notificationSettings.eventUpdates
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Radius Setting */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-foreground mb-4">Rayon de recherche</h2>
              <div className="bg-white border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <label className="font-semibold text-foreground">Distance maximale</label>
                  <span className="text-2xl font-bold text-primary-600">{notificationSettings.radius}km</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={notificationSettings.radius}
                  onChange={handleRadiusChange}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
                <p className="text-sm text-muted-foreground mt-3">
                  Vous recevrez des notifications pour les événements à moins de {notificationSettings.radius}km
                </p>
              </div>
            </div>

            {/* Upcoming Events Preview */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-foreground mb-4">Événements à venir</h2>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-primary-50 to-secondary/10 border border-primary-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">🎵</span>
                    <div>
                      <h3 className="font-semibold text-foreground">Festival de Musique Électronique</h3>
                      <p className="text-sm text-muted-foreground mt-1">Dans 2 jours • 0.8km</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">⚽</span>
                    <div>
                      <h3 className="font-semibold text-foreground">Marathon de la Ville</h3>
                      <p className="text-sm text-muted-foreground mt-1">Dans 3 jours • 3.2km</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {!notificationSettings.enableNotifications && (
          <div className="bg-muted/50 border border-border rounded-xl p-6 text-center">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-foreground font-semibold mb-2">Notifications désactivées</p>
            <p className="text-muted-foreground text-sm">
              Activez les notifications pour rester informé des événements proches de vous.
            </p>
          </div>
        )}
      </div>

      <div className="safe-bottom" />
      <BottomNav />
    </div>
  );
}
