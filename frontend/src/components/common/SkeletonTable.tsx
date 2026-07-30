import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
}

export default function SkeletonTable({
  rows = 8,
  columns = 6,
}: SkeletonTableProps) {
  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-64" />

        <Skeleton className="h-10 w-36" />
      </div>

      {/* Header */}
      <div className="grid gap-4 rounded-md border p-4"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-4 w-24"
          />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, row) => (
        <div
          key={row}
          className="grid items-center gap-4 rounded-md border p-4"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: columns }).map((_, column) => (
            <Skeleton
              key={column}
              className="h-5 w-full"
            />
          ))}
        </div>
      ))}
    </div>
  );
}