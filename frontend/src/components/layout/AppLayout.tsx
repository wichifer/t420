import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import { Header } from "./Header";

import { navigation } from "./navigation";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex bg-background">

      <Sidebar items={navigation} />

      <div className="flex-1 flex flex-col min-w-0">

        <Header items={navigation} />

        <main className="flex-1 p-6 min-h-0">
          <Outlet />
        </main>

      </div>

    </div>
  );
}
