// src/modules/empresas/pages/EmpresaEditPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEmpresa } from "../hooks/useEmpresa";
import { useUpdateEmpresa } from "../hooks/useUpdateEmpresa";
import EmpresaForm from "../components/EmpresaForm";

export default function EmpresaEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const empresaId = Number(id);

  const { data, isLoading } = useEmpresa(empresaId);
  const updateEmpresa = useUpdateEmpresa();

  const handleSubmit = (values: any) => {
    updateEmpresa.mutate(
      { id: empresaId, data: values },
      {
        onSuccess: () => {
          navigate("/empresas");
        },
      }
    );
  };

  if (isLoading) return <div>Cargando empresa...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Editar Empresa</h1>

      <EmpresaForm
        initialValues={data}
        onSubmit={handleSubmit}
        loading={updateEmpresa.isPending}
      />
    </div>
  );
}