import { Badge } from "@/components/ui/badge";

interface Props {
  esConsumidorFinal?: boolean;
}

export default function ClienteTypeBadge({
  esConsumidorFinal = false,
}: Props) {

  if (esConsumidorFinal) {
    return (
      <Badge variant="secondary">
        Cons Final Anón.
      </Badge>
    );
  }

  return (
    <Badge variant="outline">
      Cliente
    </Badge>
  );
}