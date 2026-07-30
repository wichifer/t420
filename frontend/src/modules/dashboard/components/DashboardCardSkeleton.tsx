export function DashboardCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-6 animate-pulse">
      <div className="flex justify-between">

        <div className="space-y-3 flex-1">

          <div className="h-4 w-24 rounded bg-muted" />

          <div className="h-8 w-16 rounded bg-muted" />

          <div className="h-3 w-32 rounded bg-muted" />

        </div>

        <div className="h-8 w-8 rounded bg-muted" />

      </div>
    </div>
  );
}