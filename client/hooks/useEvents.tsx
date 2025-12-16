import { createContext, useContext, useState, ReactNode } from "react";
import { mockEvents, Event } from "@/lib/mockEvents";
import { Toaster, toast } from "sonner";

interface EventContextType {
    events: Event[];
    addEvent: (event: Omit<Event, "id">) => void;
    joinEvent: (eventId: string) => void;
    isParticipating: (eventId: string) => boolean;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: ReactNode }) {
    const [events, setEvents] = useState<Event[]>(mockEvents);
    const [participations, setParticipations] = useState<Set<string>>(new Set());

    const addEvent = (newEvent: Omit<Event, "id">) => {
        const id = Math.random().toString(36).substr(2, 9);
        const event = { ...newEvent, id };
        setEvents((prev) => [event, ...prev]);
    };

    const joinEvent = (eventId: string) => {
        setParticipations((prev) => {
            const next = new Set(prev);
            if (next.has(eventId)) {
                next.delete(eventId);
                toast.info("Vous ne participez plus à cet événement.");
            } else {
                next.add(eventId);
                toast.success("Vous êtes bien inscrit à cet évènement");
            }
            return next;
        });
    };

    const isParticipating = (eventId: string) => participations.has(eventId);

    return (
        <EventContext.Provider value={{ events, addEvent, joinEvent, isParticipating }}>
            {children}
        </EventContext.Provider>
    );
}

export function useEvents() {
    const context = useContext(EventContext);
    if (context === undefined) {
        throw new Error("useEvents must be used within an EventProvider");
    }
    return context;
}
