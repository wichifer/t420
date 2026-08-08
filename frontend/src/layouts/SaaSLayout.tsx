import { Outlet } from "react-router-dom";

import { Header } from "@/components/layout/Header";
import SidebarSaaS from "./SidebarSaaS";
import { navigationSaaS } from "./navigationSaaS";

export default function SaaSLayout() {
  return (
    <div className="min-h-screen flex bg-background">
      <SidebarSaaS />

      <div className="flex-1 flex-col flex min-w-0">
        <Header items={navigationSaaS} />

        <main className="flex-1 p-6 min-h-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
