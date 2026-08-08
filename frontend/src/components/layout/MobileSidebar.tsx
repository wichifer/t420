import { useState } from "react";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import SidebarNav from "./SidebarNav";
import type { NavigationItem } from "./navigation";

interface Props {
  items: NavigationItem[];
}

export default function MobileSidebar({ items }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="md:hidden p-2 rounded hover:bg-accent">
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="w-64 p-0">
        <div className="h-14 flex items-center px-4 border-b font-bold">
          SaaS T420
        </div>

        <SidebarNav
          items={items}
          onNavigate={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
}
