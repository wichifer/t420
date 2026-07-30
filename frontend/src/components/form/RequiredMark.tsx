import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export function RequiredMark({
  className,
}: Props) {
  return (
    <span
      className={cn(
        "ml-1 text-destructive",
        className
      )}
    >
      *
    </span>
  );
}