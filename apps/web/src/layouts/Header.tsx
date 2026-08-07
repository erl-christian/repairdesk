import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

import { pageTitles } from "@/constants/page-titles";

type HeaderProps = {
  collapsed: boolean;
  onToggleSidebar: () => void;
};

export function Header({ collapsed, onToggleSidebar }: HeaderProps) {
  const location = useLocation();

  const pageTitle = pageTitles[location.pathname] ?? "RepairDesk";

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </Button>

        <h1 className="text-xl font-semibold">
          {pageTitle}
        </h1>
      </div>

      <p className="text-sm text-muted-foreground">
        RepairDesk Bohol
      </p>
    </header>
  );
}