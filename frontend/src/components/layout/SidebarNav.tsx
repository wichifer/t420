import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "./navigation";

interface Props {
  items: NavigationItem[];
  onNavigate?: () => void;
}

export default function SidebarNav({ items, onNavigate }: Props) {
  return (
    <nav className="flex-1 p-2 space-y-1">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.href}
            to={item.href}
            onClick={onNavigate}
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
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
