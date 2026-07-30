import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  CreditCard,
  BarChart3,
  Warehouse,
  Wallet,
} from "lucide-react";

import type { NavigationItem } from "./navigation.types";

export const navigationEmpresa: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Clientes",
    href: "/clients",
    icon: Users,
  },
  {
    label: "Productos",
    href: "/products",
    icon: Package,
  },
  {
    label: "Órdenes",
    href: "/orders",
    icon: ShoppingCart,
  },
  {
    label: "Pagos",
    href: "/payments",
    icon: CreditCard,
  },
  {
    label: "Caja",
    href: "/cash",
    icon: Wallet,
  },
  {
    label: "Stock",
    href: "/stock",
    icon: Warehouse,
  },
  {
    label: "Reportes",
    href: "/reports",
    icon: BarChart3,
  },
];