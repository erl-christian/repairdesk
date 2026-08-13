import { NavItem } from "./NavItem";
import { adminNavigation } from "@/constants/navigation";

type SidebarProps = {
  collapsed: boolean;
};

export function Sidebar({ collapsed }: SidebarProps) {
  return (
    <aside
      className={`border-r bg-background transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex h-full flex-col">

        {/* Logo */}

        <div className="border-b px-6 py-5">
          {!collapsed ? (
            <>
              <h1 className="text-lg font-bold">
                RepairDesk
              </h1>

              <p className="text-xs text-muted-foreground">
                Bohol
              </p>
            </>
          ) : (
            <h1 className="text-center text-xl font-bold">
                🔧
            </h1>
          )}
        </div>

        {/* Navigation */}

        <nav className="flex-1 space-y-1 p-3">
          {adminNavigation.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              label={item.label}
              icon={item.icon}
              collapsed={collapsed}
            />
          ))}
        </nav>

      </div>
    </aside>
  );
}