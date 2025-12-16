import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "./BottomNav";

export default function Layout() {
    const location = useLocation();
    // Hide bottom nav on specific pages if needed (e.g. detailed view if requested, or login)
    // For now, show it everywhere or maybe hide on 404?
    const showNav = !location.pathname.startsWith("/auth");

    return (
        <div className="min-h-[100dvh] md:min-h-screen md:bg-zinc-100 md:flex md:items-center md:justify-center md:py-8 font-sans">
            {/* Phone Frame Container - Active only on md+ screens */}
            {/* We use transform-gpu to create a containing block for fixed position elements like BottomNav */}
            <div className="w-full min-h-[100dvh] md:min-h-[calc(100vh-4rem)] md:h-[844px] md:max-h-[900px] md:max-w-[390px] bg-background md:relative md:overflow-hidden md:shadow-2xl md:rounded-[3rem] md:border-[8px] md:border-gray-900 md:transform-gpu transition-all duration-300">

                {/* Dynamic Notch (Visual only on desktop) */}
                <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 h-7 w-32 bg-gray-900 rounded-b-2xl z-50 pointer-events-none"></div>

                {/* Content Area - Scrollable */}
                <div className="h-full overflow-y-auto overflow-x-hidden no-scrollbar pb-20 md:pb-0 safe-top scroll-smooth">
                    <Outlet />

                    {/* Spacer for BottomNav content */}
                    {showNav && <div className="h-24 md:h-28" />}
                </div>

                {/* Navigation */}
                {showNav && <BottomNav />}
            </div>
        </div>
    );
}
