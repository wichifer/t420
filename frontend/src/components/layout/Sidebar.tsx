/* src/components/layout/Sidebar.tsx*/

import SidebarNav from "./SidebarNav";

export default function Sidebar() {
  return (
    <aside
      className="
        hidden md:flex
        w-64 shrink-0
        flex-col
        border-r
        bg-sidebar
        text-sidebar-foreground
        min-h-screen
      "
    >
      <div className="h-14 flex items-center px-4 border-b">
        <span className="font-bold text-sm">
          SaaS T420
        </span>
      </div>

      <SidebarNav />
    </aside>
  );
}