import { Switch } from "@/components/ui/switch";

import type { Empresa } from "@/types/empresa";

import { useUpdateEmpresaStatus } from "../hooks/useUpdateEmpresaStatus";
import { useConfirmStore } from "@/store/confirmStore";

interface Props {
  empresa: Empresa;
}

export function EmpresaStatusSwitch({
  empresa,
}: Props) {
  const mutation = useUpdateEmpresaStatus();

  const { openConfirm } = useConfirmStore();

  const handleChange = (checked: boolean) => {
    openConfirm({
      title: checked
        ? "Activar empresa"
        : "Suspender empresa",

      description: checked
        ? "La empresa podrá volver a ingresar al sistema."
        : "La empresa no podrá ingresar al sistema hasta ser activada nuevamente.",

      confirmText: checked ? "Activar" : "Suspender",

      variant: checked ? "default" : "destructive",

      onConfirm: async () => {
        await mutation.mutateAsync({
          id: empresa.id_empresa,
          estado: checked,
        });
      },
    });
  };

return (
  <div className="flex items-center gap-2">
<Switch
  checked={empresa.estado}
  disabled={mutation.isPending}
  onCheckedChange={handleChange}
  className={
    empresa.estado
      ? "data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
      : "data-[state=unchecked]:bg-red-600 data-[state=unchecked]:border-red-600"
  }
/>

    <span
      className={
        empresa.estado
          ? "text-sm text-green-600 font-medium"
          : "text-sm text-red-600 font-medium"
      }
    >
      {empresa.estado ? "Activa" : "Suspendida"}
    </span>
  </div>
);
}
