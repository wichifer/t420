import { DashboardGrid } from "../components/DashboardGrid";
import { useDashboard } from "../hooks/useDashboard";
import { DashboardGridSkeleton } from "../components/DashboardGridSkeleton";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const {
    data: dashboard,
    isLoading,
    isError,
    refetch,
  } = useDashboard();

if (isLoading) {
  return (
    <div className="space-y-8">

      <div>
        <div className="h-8 w-56 rounded bg-muted animate-pulse" />
        <div className="mt-3 h-4 w-72 rounded bg-muted animate-pulse" />
      </div>

      <DashboardGridSkeleton />

    </div>
  );
}

  if (isError || !dashboard) {
    return (
      <div className="space-y-4 p-6">
        <p>No se pudo cargar el dashboard.</p>

<Button onClick={() => refetch()}>
  Reintentar
</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard SaaS
        </h1>

        <p className="text-muted-foreground">
          Panel de administración del sistema.
        </p>
      </div>

      <DashboardGrid data={dashboard} />

      <section className="rounded-xl border bg-card p-6">
        <h2 className="text-lg font-semibold">
          Próximamente
        </h2>

        <p className="mt-2 text-muted-foreground">
          Aquí se mostrarán la actividad reciente,
          nuevas empresas, suscripciones y métricas
          generales del SaaS.
        </p>
      </section>

    </div>
  );
}