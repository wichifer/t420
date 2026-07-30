import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export default function EmptyState({
  title,
  description,
  icon,
  action,
  children,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 p-8 text-center animate-in fade-in",
        className
      )}
    >
      <div className="mb-4 text-muted-foreground">
        {icon ?? <Inbox className="h-12 w-12" />}
      </div>

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      {description && (
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}

      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
}