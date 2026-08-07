import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Sidebar } from "@/components/layout/SideBar";
import { Header } from "./Header";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar collapsed={collapsed} />

      <div className="flex flex-1 flex-col">
        <Header
          collapsed={collapsed}
          onToggleSidebar={() =>
            setCollapsed(!collapsed)
          }
        />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}