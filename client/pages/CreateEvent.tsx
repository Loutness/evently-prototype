import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { eventCategories } from "@/lib/mockEvents";
import { ArrowLeft } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export default function CreateEvent() {
  const navigate = useNavigate();
  const { addEvent } = useEvents();
  const { user } = useAuth(); // Assuming we want to track organizer

  useEffect(() => {
    if (user && user.role !== "organizer") {
      navigate("/");
      toast.error("Seuls les organisateurs peuvent créer des événements.");
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "music",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Add event via context
    addEvent({
      ...formData,
      latitude: 48.8566, // Default Paris coords for demo
      longitude: 2.3522,
      distance: 0, // Should be calc in real app
      attendees: 0,
      organizer: user?.name || "Moi", // Use logged user name or default
    });

    toast.success("Événement publié avec succès !");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-border safe-top pt-4 pb-4 px-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Créer un événement</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-4 py-6 max-w-2xl mx-auto">
        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-foreground mb-2">
            Titre de l'événement
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ex: Concert de musique live"
            required
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-foreground mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Décrivez votre événement en détail..."
            required
            rows={5}
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Date */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-foreground mb-2">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Time */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-foreground mb-2">
            Heure
          </label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Location */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-foreground mb-2">
            Lieu
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Ex: Parc Central, Paris"
            required
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Category */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-foreground mb-3">
            Catégorie
          </label>
          <div className="grid grid-cols-2 gap-3">
            {eventCategories.map((category) => (
              <label
                key={category.id}
                className={`flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-all ${formData.category === category.id
                  ? "border-primary-600 bg-primary-50"
                  : "border-border hover:border-primary-200"
                  }`}
              >
                <input
                  type="radio"
                  name="category"
                  value={category.id}
                  checked={formData.category === category.id}
                  onChange={handleChange}
                  className="accent-primary-600"
                />
                <span className="text-lg">{category.icon}</span>
                <span className="text-sm font-medium text-foreground">{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary-600 text-white font-semibold py-4 rounded-xl hover:bg-primary-700 transition-colors mb-4"
        >
          Publier
        </button>

        {/* Cancel Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full bg-muted text-foreground font-semibold py-3 rounded-xl hover:bg-muted/80 transition-colors"
        >
          Annuler
        </button>
      </form>

      <div className="safe-bottom" />
      <BottomNav />
    </div>
  );
}
