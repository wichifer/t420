// src/modules/empresas/components/modals/EmpresaModalDelete.tsx
import type { Empresa } from "@/types/empresa";



interface Props {
  open: boolean;
  onClose: () => void;
  empresa: Empresa;
}

export function EmpresaModalDelete({
  open,
  onClose,
  empresa,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold">
          Confirmar eliminación
        </h2>

        <p className="mt-2">
          ¿Desea eliminar la empresa{" "}
          <strong>{empresa.razon_social}</strong>?
        </p>

        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose}>
            Cancelar
          </button>

          <button>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}