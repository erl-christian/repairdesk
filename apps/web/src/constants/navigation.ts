import {
    LayoutDashboard,
    Wrench,
    Clock3,
    StickyNote,
    Search,
} from "lucide-react";

export const adminNavigation = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        to: "/admin",
    },
    {
        label: "Repair Request",
        icon: Wrench,
        to: "/admin/repair-request",
    },
    {
        label: "Timeline",
        icon: Clock3,
        to: "/admin/timeline",
    },
    {
        label: "Repair Notes",
        icon: StickyNote,
        to: "/admin/repair-notes",
    },
    {
        label: "Public Tracking",
        icon: Search,
        to: "/admin/public-tracking",
    }

]