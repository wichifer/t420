import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonCardsProps {
  cards?: number;
}

export default function SkeletonCards({
  cards = 4,
}: SkeletonCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: cards }).map((_, index) => (
        <div
          key={index}
          className="rounded-lg border p-6"
        >
          <Skeleton className="h-4 w-24" />

          <Skeleton className="mt-4 h-8 w-20" />

          <Skeleton className="mt-4 h-3 w-32" />
        </div>
      ))}
    </div>
  );
}