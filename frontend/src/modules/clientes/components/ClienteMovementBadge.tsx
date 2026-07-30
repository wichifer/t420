import { Badge } from "@/components/ui/badge";
import type { ClienteMovimiento } from "../types/cliente";

interface Props {
  tipo: ClienteMovimiento["tipo_movimiento"];
}

export function ClienteMovementBadge({ tipo }: Props) {
  const variants = {
    VENTA: "destructive",
    PAGO: "default",
    NOTA_CREDITO: "secondary",
    AJUSTE: "outline",
    SALDO_INICIAL: "outline",
  } as const;

  const labels = {
    VENTA: "Venta",
    PAGO: "Pago",
    NOTA_CREDITO: "Nota de crédito",
    AJUSTE: "Ajuste",
    SALDO_INICIAL: "Saldo inicial",
  } as const;

  return (
    <Badge variant={variants[tipo]}>
      {labels[tipo]}
    </Badge>
  );
}