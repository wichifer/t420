import { Skeleton } from "@/components/ui/skeleton";

export function ClienteDetailsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Datos del cliente */}
      <div className="rounded-lg border p-4 space-y-3">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="rounded-lg border p-4 space-y-3"
          >
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-32" />
          </div>
        ))}
      </div>

      {/* Tabla */}
      <div className="rounded-lg border">
        <div className="border-b p-3">
          <Skeleton className="h-5 w-32" />
        </div>

        <div className="p-3 space-y-3">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="grid grid-cols-4 gap-4"
            >
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}