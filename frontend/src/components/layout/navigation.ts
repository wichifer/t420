import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  CreditCard,
  Wallet,
  Boxes,
  BarChart3,
  ClipboardList,
} from "lucide-react";

export interface NavigationItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

export const navigation: NavigationItem[] = [
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
    icon: Boxes,
  },

  {
    label: "Reportes",
    href: "/reports",
    icon: BarChart3,
  },
];