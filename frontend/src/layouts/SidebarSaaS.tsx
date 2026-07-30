import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

import { navigationSaaS } from "./navigationSaaS";


export default function SidebarSaaS() {
  return (
    <aside
      className="
        hidden md:flex
        w-64 shrink-0
        flex-col
        border-r border-border
        bg-sidebar
        text-sidebar-foreground
        min-h-screen
      "
    >

      {/* Header */}
      <div className="h-14 flex items-center px-4 border-b border-sidebar-border">
        <span className="font-bold text-sm text-sidebar-foreground">
          Panel SaaS T420
        </span>
      </div>


      {/* Nav */}
      <nav className="flex-1 p-2 space-y-1">

        {navigationSaaS.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition w-full truncate",
                  "hover:bg-sidebar-primary/10 hover:text-sidebar-foreground",
                  isActive
                    ? "bg-sidebar-primary text-white"
                    : "text-sidebar-foreground/90"
                )
              }
            >

              <Icon className="h-4 w-4" />

              <span className="truncate">
                {item.label}
              </span>

            </NavLink>
          );

        })}

      </nav>

    </aside>
  );
}