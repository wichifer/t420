import type { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  description?: string;
}

export function DashboardCard({
  title,
  value,
  icon,
  description,
}: DashboardCardProps) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>

          {description && (
            <p className="mt-2 text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        <div className="text-muted-foreground">
          {icon}
        </div>

      </div>
    </div>
  );
}