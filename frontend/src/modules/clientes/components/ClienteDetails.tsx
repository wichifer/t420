import { useClienteEstadoCuenta } from "../hooks/useClienteEstadoCuenta";

import type { Cliente } from "../types/cliente";

import { formatCurrency } from "@/lib/formatters";

import { ClienteMovementBadge } from "./ClienteMovementBadge";

import { ClienteDetailsSkeleton } from "./ClienteDetailsSkeleton";


interface Props {
  cliente: Cliente;
}


export function ClienteDetails({
  cliente,
}: Props) {


  const {
    data,
    isLoading,
    error,
  } = useClienteEstadoCuenta(
    cliente.id_cliente,
  );


if (isLoading) {
  return <ClienteDetailsSkeleton />;
}


  if (error || !data) {

    return (
      <p>
        Error al cargar cuenta corriente
      </p>
    );

  }


  const {
    resumen,
    movimientos,
  } = data;


  return (

    <div className="space-y-6">


      <div className="rounded-lg border p-4">

        <h3 className="font-semibold text-lg">

          {
            cliente.razon_social ||
            `${cliente.nombre ?? ""} ${cliente.apellido ?? ""}`.trim()
          }

        </h3>


        <p className="text-sm text-muted-foreground">

          {cliente.email || "-"}

        </p>


        <p className="text-sm">

          Tel:
          {" "}
          {cliente.telefono || "-"}

        </p>


      </div>



        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border p-4 bg-red-50">
            <p className="text-sm text-muted-foreground">
            Debe
            </p>
            <p className="text-2xl font-bold text-red-600">
            {formatCurrency(resumen.debe)}
            </p>
        </div>

        <div className="rounded-lg border p-4 bg-green-50">
            <p className="text-sm text-muted-foreground">
            Pagado
            </p>
            <p className="text-2xl font-bold text-green-600">
            {formatCurrency(resumen.pagado)}
            </p>
        </div>

        <div className="rounded-lg border p-4 bg-blue-50">
            <p className="text-sm text-muted-foreground">
            Saldo actual
            </p>
            <p className="text-3xl font-bold text-blue-600">
            {formatCurrency(resumen.saldo)}
            </p>
        </div>
        </div>



        <div className="rounded-lg border overflow-hidden">
        <div className="border-b p-4 font-semibold bg-muted/30">
            Movimientos
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-sm">
            <thead className="bg-muted/20">
                <tr className="border-b">
                <th className="p-3 text-left font-medium">
                    Fecha
                </th>
                <th className="p-3 text-left font-medium">
                    Tipo
                </th>
                <th className="p-3 text-left font-medium">
                    Concepto
                </th>
                <th className="p-3 text-right font-medium">
                    Monto
                </th>
                </tr>
            </thead>

            <tbody>
                {movimientos.length === 0 ? (
                <tr>
                    <td
                    colSpan={4}
                    className="p-6 text-center text-muted-foreground"
                    >
                    No hay movimientos registrados
                    </td>
                </tr>
                ) : (
                movimientos.map((mov) => (
                    <tr
                    key={mov.id_movimiento_cliente}
                    className="border-b hover:bg-muted/20 transition-colors"
                    >
                    <td className="p-3 whitespace-nowrap">
                        {new Date(
                        mov.created_at
                        ).toLocaleDateString("es-AR")}
                    </td>

                    <td className="p-3">
                        <ClienteMovementBadge
                        tipo={mov.tipo_movimiento}
                        />
                    </td>

                    <td className="p-3 min-w-[200px]">
                        {mov.observacion || "-"}
                    </td>

                    <td className="p-3 text-right font-medium whitespace-nowrap">
                        {formatCurrency(mov.monto)}
                    </td>
                    </tr>
                ))
                )}
            </tbody>
            </table>
        </div>
        </div>

    </div>

  );

}