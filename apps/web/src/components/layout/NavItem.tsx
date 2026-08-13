import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";


type NavItemProps = {
  to: string;
  label: string;
  icon: LucideIcon; // Changed to accept the component reference
  collapsed?: boolean;
};

export function NavItem({ to, label, icon: Icon, collapsed = false }: NavItemProps) {
  const location = useLocation();

  const isActive =
    location.pathname === to ||
    (to !== "/admin" && location.pathname.startsWith(to));

  return (
    <Link
      to={to}
      title={collapsed ? label : undefined}
      className={cn(
        "group flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
        collapsed ? "justify-center" : "gap-3",
        isActive
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center transition-colors",
          isActive
            ? "text-foreground"
            : "text-muted-foreground group-hover:text-foreground"
        )}
      >
        {/* We render the icon here and dynamically boost the thickness if active */}
        <Icon 
          size={18} 
          strokeWidth={isActive ? 2.5 : 2} 
        />
      </div>
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}