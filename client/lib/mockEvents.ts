export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  latitude: number;
  longitude: number;
  distance: number; // in km
  category: string;
  attendees: number;
  image?: string;
  organizer: string;
}

export const eventCategories = [
  { id: "music", name: "Musique", color: "from-pink-500 to-rose-500", icon: "🎵" },
  { id: "sports", name: "Sports", color: "from-orange-500 to-red-500", icon: "⚽" },
  { id: "food", name: "Gastronomie", color: "from-yellow-500 to-orange-500", icon: "🍽️" },
  { id: "art", name: "Art & Culture", color: "from-purple-500 to-indigo-500", icon: "🎨" },
  { id: "tech", name: "Technologie", color: "from-blue-500 to-cyan-500", icon: "💻" },
  { id: "social", name: "Social", color: "from-green-500 to-emerald-500", icon: "👥" },
];

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Festival de Musique Électronique",
    description: "Un festival de musique électronique avec les meilleurs DJ du moment. Ambiance energétique et divertissante.",
    date: "2024-02-15",
    time: "20:00",
    location: "Parc Central, Paris",
    latitude: 48.8566,
    longitude: 2.3522,
    distance: 0.8,
    category: "music",
    attendees: 340,
    organizer: "EventsMax",
  },
  {
    id: "2",
    title: "Marathon de la Ville",
    description: "Participez au grand marathon annuel de la ville. 42 km à parcourir avec amis et famille.",
    date: "2024-02-16",
    time: "08:00",
    location: "Stade Municipal, Lyon",
    latitude: 45.7640,
    longitude: 4.8357,
    distance: 3.2,
    category: "sports",
    attendees: 850,
    organizer: "Sports City",
  },
  {
    id: "3",
    title: "Dégustation de Vins Français",
    description: "Découvrez les meilleurs crus français dans une ambiance conviviale. Animation et conseils d'experts.",
    date: "2024-02-17",
    time: "19:00",
    location: "Cave du Coin, Bordeaux",
    latitude: 44.8378,
    longitude: -0.5792,
    distance: 1.5,
    category: "food",
    attendees: 120,
    organizer: "Wine Lovers",
  },
  {
    id: "4",
    title: "Exposition d'Art Contemporain",
    description: "Galerie contemporaine présentant les œuvres des artistes émergents. Vernissage avec cocktail.",
    date: "2024-02-18",
    time: "18:00",
    location: "Musée d'Art Moderne, Marseille",
    latitude: 43.2965,
    longitude: 5.3698,
    distance: 2.1,
    category: "art",
    attendees: 280,
    organizer: "Modern Arts",
  },
  {
    id: "5",
    title: "Conférence sur l'IA et le Futur",
    description: "Les experts débattent de l'impact de l'IA sur la société. Questions et réponses en direct.",
    date: "2024-02-20",
    time: "14:00",
    location: "Centre des Congrès, Nice",
    latitude: 43.7102,
    longitude: 7.2620,
    distance: 4.7,
    category: "tech",
    attendees: 620,
    organizer: "Tech Innovators",
  },
  {
    id: "6",
    title: "Pique-nique Communautaire",
    description: "Venez vous détendre en famille ou entre amis au parc. Partage de repas et jeux collectifs.",
    date: "2024-02-21",
    time: "11:00",
    location: "Parc de la Tête d'Or, Lyon",
    latitude: 45.7595,
    longitude: 4.8367,
    distance: 2.8,
    category: "social",
    attendees: 450,
    organizer: "Community Events",
  },
  {
    id: "7",
    title: "Concert Symphonique Classique",
    description: "Orchestre philharmonique jouant les plus belles symphonies classiques. Un événement incontournable.",
    date: "2024-02-22",
    time: "20:30",
    location: "Opéra Garnier, Paris",
    latitude: 48.8721,
    longitude: 2.3909,
    distance: 1.2,
    category: "music",
    attendees: 1200,
    organizer: "Classical Music Society",
  },
  {
    id: "8",
    title: "Tournoi de Tennis",
    description: "Compétition de tennis avec des joueurs amateurs et semi-professionnels. Inscriptions ouvertes.",
    date: "2024-02-23",
    time: "09:00",
    location: "Club de Tennis Roland Garros, Paris",
    latitude: 48.8453,
    longitude: 2.2465,
    distance: 3.5,
    category: "sports",
    attendees: 180,
    organizer: "Tennis Club",
  },
];

export function getCategoryInfo(categoryId: string) {
  return eventCategories.find(cat => cat.id === categoryId);
}

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
