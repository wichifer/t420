import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  children: React.ReactNode;
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "success";
}

export function StatusBadge({
  children,
  variant = "default",
}: StatusBadgeProps) {

  const variants = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    destructive: "bg-destructive text-destructive-foreground",
    outline: "border border-input",
    success: "bg-green-100 text-green-700",
  };


  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-2
        py-1
        text-xs
        font-medium
        ${variants[variant]}
      `}
    >
      {children}
    </span>
  );
}