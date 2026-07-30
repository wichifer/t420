import { DashboardCardSkeleton } from "./DashboardCardSkeleton";

export function DashboardGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      <DashboardCardSkeleton />
      <DashboardCardSkeleton />
      <DashboardCardSkeleton />
      <DashboardCardSkeleton />

    </div>
  );
}