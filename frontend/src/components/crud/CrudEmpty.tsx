// CrudEmpty.tsx

import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

interface CrudEmptyProps {
  title: string;
  description?: string;

  icon?: ReactNode;

  actionLabel?: string;

  onAction?: () => void;
}

export function CrudEmpty({
  title,
  description,
  icon,
  actionLabel,
  onAction,
}: CrudEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center">

      {icon}

      <h3 className="mt-4 text-lg font-semibold">
        {title}
      </h3>

      {description && (
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          {description}
        </p>
      )}

      {actionLabel && onAction && (
        <Button
          className="mt-6"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}

    </div>
  );
}