import { Outlet } from "react-router-dom";

import { Header } from "@/components/layout/Header";
import SidebarEmpresa from "./SidebarEmpresa";

export default function EmpresaLayout() {
  return (
    <div className="min-h-screen flex bg-background">
      <SidebarEmpresa />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-6 min-h-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}