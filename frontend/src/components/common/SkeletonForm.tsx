import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonFormProps {
  fields?: number;
}

export default function SkeletonForm({
  fields = 6,
}: SkeletonFormProps) {
  return (
    <div className="space-y-6">
      {Array.from({ length: fields }).map((_, index) => (
        <div
          key={index}
          className="space-y-2"
        >
          <Skeleton className="h-4 w-24" />

          <Skeleton className="h-10 w-full" />
        </div>
      ))}

      <div className="flex justify-end gap-2 pt-4">
        <Skeleton className="h-10 w-24" />

        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}