import { Badge } from "@/components/ui/badge";

interface Props {
  actual: number;
  minimo: number;
}

export default function StockStatusBadge({
  actual,
  minimo,
}: Props) {
  if (actual <= 0) {
    return (
      <Badge variant="destructive">
        Crítico
      </Badge>
    );
  }

  if (actual <= minimo) {
    return (
      <Badge className="bg-orange-500 hover:bg-orange-500">
        Bajo
      </Badge>
    );
  }

  return (
    <Badge className="bg-green-600 hover:bg-green-600">
      Normal
    </Badge>
  );
}