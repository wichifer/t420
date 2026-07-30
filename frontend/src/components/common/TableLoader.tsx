// src/components/common/TableLoader.tsx

import { Skeleton } from "@/components/ui/skeleton";

interface TableLoaderProps {
  rows?: number;
  columns?: number;
}

export function TableLoader({
  rows = 8,
  columns = 5,
}: TableLoaderProps) {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: rows }).map((_, row) => (
        <div
          key={row}
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: columns }).map((_, column) => (
            <Skeleton
              key={column}
              className="h-6 w-full"
            />
          ))}
        </div>
      ))}
    </div>
  );
}