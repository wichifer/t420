/* src/components/layout/AppLayout.tsx */
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Header} from "./Header";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex bg-background">

      {/* Sidebar */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0">

        <Header />

        <main className="flex-1 p-6 min-h-0">
          <Outlet />
        </main>

      </div>

    </div>
  );
}