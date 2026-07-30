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
    <Switch
      checked={empresa.estado}
      disabled={mutation.isPending}
      onCheckedChange={handleChange}
    />
  );
}