import {
  Ban,
  Building2,
  CheckCircle2,
  Users,
} from "lucide-react";

import { DashboardCard } from "./DashboardCard";
import type { Dashboard } from "../types/dashboard";

interface DashboardGridProps {
  data: Dashboard;
}

export function DashboardGrid({
  data,
}: DashboardGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      <DashboardCard
        title="Empresas"
        value={data.empresas}
        icon={<Building2 size={28} />}
      />

      <DashboardCard
        title="Usuarios"
        value={data.usuarios}
        icon={<Users size={28} />}
      />

      <DashboardCard
        title="Empresas activas"
        value={data.empresasActivas}
        icon={<CheckCircle2 size={28} />}
      />

      <DashboardCard
        title="Empresas suspendidas"
        value={data.empresasSuspendidas}
        icon={<Ban size={28} />}
      />

    </div>
  );
}