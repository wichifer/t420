// src/modules/empresas/pages/EmpresaEditPage.tsx

import { useParams } from "react-router-dom";

import { EmpresaForm } from "../components/EmpresaForm";

export default function EmpresaEditPage() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-semibold">
        Editar Empresa
      </h1>

      <EmpresaForm
        id={Number(id)}
      />
    </div>
  );
}