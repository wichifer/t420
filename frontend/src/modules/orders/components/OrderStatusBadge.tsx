// C:\dev\ordenes-saas-frontend\src\modules\orders\components\OrderStatusBadge.tsx
import { StatusBadge } from "@/components/common/StatusBadge";

interface Props {
  status: string;
}

export function OrderStatusBadge({
  status,
}: Props) {

  switch (status) {

    case "PENDIENTE":
      return (
        <StatusBadge variant="outline">
          Pendiente
        </StatusBadge>
      );

    case "APROBADA":
      return (
        <StatusBadge>
          Aprobada
        </StatusBadge>
      );

    case "CANCELADA":
      return (
        <StatusBadge variant="destructive">
          Cancelada
        </StatusBadge>
      );

    default:
      return (
        <StatusBadge variant="secondary">
          {status}
        </StatusBadge>
      );
  }

}