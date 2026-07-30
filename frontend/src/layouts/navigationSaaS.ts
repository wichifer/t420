import {
  LayoutDashboard,
  Building2,
} from "lucide-react";

import type { NavigationItem } from "./navigation.types";

export const navigationSaaS: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/saas/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Empresas",
    href: "/saas/empresas",
    icon: Building2,
  },
];