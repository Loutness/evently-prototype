import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { mockEvents, getCategoryInfo, eventCategories } from "@/lib/mockEvents";
import { MapPin, Users, Clock, ChevronRight, Filter, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

type SortType = "date" | "distance";
type SortOrder = "asc" | "desc";

export default function Events() {
  const [sortBy, setSortBy] = useState<SortType>("distance");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort events
  const filteredAndSortedEvents = useMemo(() => {
    let result = mockEvents;

    // Filter by category
    if (selectedCategory) {
      result = result.filter((event) => event.category === selectedCategory);
    }

    // Sort events
    result.sort((a, b) => {
      let compareValue = 0;

      if (sortBy === "date") {
        compareValue = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        compareValue = a.distance - b.distance;
      }

      return sortOrder === "asc" ? compareValue : -compareValue;
    });

    return result;
  }, [sortBy, sortOrder, selectedCategory]);

  const toggleSort = (newSortBy: SortType) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("asc");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-border safe-top pt-4 pb-4 px-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-foreground">Événements</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "p-2 rounded-lg transition-colors",
              showFilters
                ? "bg-primary-100 text-primary-600"
                : "bg-muted hover:bg-muted/80 text-muted-foreground"
            )}
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Sort Options */}
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => toggleSort("distance")}
            className={cn(
              "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              sortBy === "distance"
                ? "bg-primary-100 text-primary-600"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            Distance
            {sortBy === "distance" && (
              sortOrder === "asc" ? (
                <ArrowUp className="w-4 h-4" />
              ) : (
                <ArrowDown className="w-4 h-4" />
              )
            )}
          </button>
          <button
            onClick={() => toggleSort("date")}
            className={cn(
              "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              sortBy === "date"
                ? "bg-primary-100 text-primary-600"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            Date
            {sortBy === "date" && (
              sortOrder === "asc" ? (
                <ArrowUp className="w-4 h-4" />
              ) : (
                <ArrowDown className="w-4 h-4" />
              )
            )}
          </button>
        </div>

        {/* Filter by Category */}
        {showFilters && (
          <div className="pb-3 border-t border-border pt-3">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium transition-colors",
                  selectedCategory === null
                    ? "bg-primary-600 text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                Toutes
              </button>
              {eventCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium transition-colors",
                    selectedCategory === category.id
                      ? "bg-primary-600 text-white"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Events List */}
      <div className="px-4 py-4">
        {filteredAndSortedEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-2">Aucun événement trouvé</p>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setShowFilters(false);
              }}
              className="text-primary-600 font-semibold text-sm hover:text-primary-700"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAndSortedEvents.map((event) => {
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
                  className="group bg-white rounded-xl p-4 border border-border hover:border-primary-300 hover:shadow-md transition-all"
                >
                  <div className="flex gap-4">
                    {/* Category Badge */}
                    <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${categoryInfo?.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                      {categoryInfo?.icon}
                    </div>

                    {/* Event Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground line-clamp-1 mb-2 group-hover:text-primary-600">
                        {event.title}
                      </h3>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{formattedDate} à {event.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span className="line-clamp-1">{event.distance.toFixed(1)}km • {event.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{event.attendees} participants</span>
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center">
                      <ChevronRight className="w-5 h-5 text-primary-300 group-hover:text-primary-600 transition-colors" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <div className="safe-bottom" />
      <BottomNav />
    </div>
  );
}
