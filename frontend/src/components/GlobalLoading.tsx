import { Loader2 } from "lucide-react";
import { useLoadingStore } from "@/store/loadingStore";

export default function GlobalLoading() {
  const { isLoading, message } = useLoadingStore();

  if (!isLoading) return null;

  return (
    <div
      className="
        fixed inset-0
        z-[9999]
        bg-black/40
        backdrop-blur-sm
        flex items-center justify-center
      "
    >
      <div
        className="
          bg-background
          rounded-xl
          shadow-xl
          p-8
          flex flex-col items-center gap-4
          min-w-[250px]
        "
      >
        <Loader2 className="h-10 w-10 animate-spin" />

        <p className="text-sm text-muted-foreground">
          {message}
        </p>
      </div>
    </div>
  );
}