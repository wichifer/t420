// src/pages/Payments.tsx

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import { api } from "../api/api";

import PageHeader from "@/components/common/PageHeader";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Payments() {

  const [searchParams] = useSearchParams();

  const [payments, setPayments] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  const [idOrden, setIdOrden] = useState("");
  const [monto, setMonto] = useState("");
  const [metodoPago, setMetodoPago] =
    useState("EFECTIVO");

  const [observaciones, setObservaciones] =
    useState("");

  const ordenSeleccionada = orders.find(
    (o) => String(o.id_orden_compra) === idOrden
  );

  useEffect(() => {

    if (ordenSeleccionada) {

      setMonto(
        String(ordenSeleccionada.saldo_pendiente)
      );

    }

  }, [ordenSeleccionada]);

  useEffect(() => {

    loadPayments();
    loadOrders();

  }, []);

  useEffect(() => {

    const orderId = searchParams.get("order");

    if (
      orderId &&
      orders.length > 0 &&
      idOrden === ""
    ) {

      setIdOrden(orderId);

    }

  }, [orders, searchParams, idOrden]);

  const loadPayments = async () => {

    try {

      const response = await api.get("/payments");

      setPayments(response.data);

    } catch (error) {

      console.error(error);

      toast.error("Error al cargar los pagos");

    }

  };

  const loadOrders = async () => {

    try {

      const response = await api.get(
        "/payments/pending-orders"
      );

      setOrders(response.data);

    } catch (error) {

      console.error(error);

      toast.error("Error al cargar las órdenes");

    }

  };

  const createPayment = async () => {

    try {

      if (!idOrden) {

        toast.error("Seleccione una orden");

        return;

      }

      if (Number(monto) <= 0) {

        toast.error("Monto inválido");

        return;

      }

      if (
        ordenSeleccionada &&
        Number(monto) >
          Number(ordenSeleccionada.saldo_pendiente)
      ) {

        toast.error(
          "El pago supera el saldo pendiente"
        );

        return;

      }

      await api.post("/payments", {

        id_orden_compra: idOrden,

        monto,

        metodo_pago: metodoPago,

        observaciones,

      });

      toast.success(
        "Pago registrado correctamente"
      );

      setIdOrden("");
      setMonto("");
      setMetodoPago("EFECTIVO");
      setObservaciones("");

      await loadPayments();
      await loadOrders();

    } catch (error: any) {

      console.error(error);

      toast.error(
        error.response?.data?.message ??
          "Error al registrar el pago"
      );

    }

  };

  return (

    <div className="space-y-6">

      <PageHeader
        title="Pagos"
        description="Gestión de pagos de órdenes aprobadas."
      />

      <Card>

        <CardHeader>
          <CardTitle className="text-xl">
            Registrar pago
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="space-y-2">

              <label className="text-sm font-medium">
                Orden aprobada
              </label>

              <Select
                value={idOrden}
                onValueChange={setIdOrden}
              >

                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Seleccionar orden aprobada" />
                </SelectTrigger>

                <SelectContent
                  className="
                    bg-background
                    border
                    shadow-xl
                    z-[100]
                    max-h-80
                  "
                >

                  {orders.map((order) => (

                    <SelectItem
                      key={order.id_orden_compra}
                      value={String(
                        order.id_orden_compra
                      )}
                    >
                      {order.numero_orden}
                      {" - "}
                      {order.cliente}
                    </SelectItem>

                  ))}

                </SelectContent>

              </Select>

            </div>

            <div className="space-y-2">

              <label className="text-sm font-medium">
                Método de pago
              </label>

              <Select
                value={metodoPago}
                onValueChange={setMetodoPago}
              >

                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent
                  className="
                    bg-background
                    border
                    shadow-xl
                    z-[100]
                    max-h-80
                  "
                >

                  <SelectItem value="EFECTIVO">
                    Efectivo
                  </SelectItem>

                  <SelectItem value="TRANSFERENCIA">
                    Transferencia
                  </SelectItem>

                  <SelectItem value="TARJETA">
                    Tarjeta
                  </SelectItem>

                </SelectContent>

              </Select>

            </div>

          </div>

          {/* ==========================
              RESUMEN DE LA ORDEN
          ========================== */}

          {ordenSeleccionada && (

            <Card className="border-2 bg-muted/20 shadow-sm">

              <CardContent className="p-6">

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>

                    <p className="text-sm text-muted-foreground">
                      Orden
                    </p>

                    <p className="text-xl font-bold">
                      {ordenSeleccionada.numero_orden}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-muted-foreground">
                      Cliente
                    </p>

                    <p className="text-lg font-semibold">
                      {ordenSeleccionada.cliente}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-muted-foreground">
                      Total
                    </p>

                    <p className="text-2xl font-bold tracking-tight">
                      ${ordenSeleccionada.total}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-muted-foreground">
                      Pagado
                    </p>

                    <p className="text-2xl font-bold tracking-tight text-green-600">
                      ${ordenSeleccionada.total_pagado}
                    </p>

                  </div>

                  <div className="col-span-2 lg:col-span-4">

                    <div className="rounded-xl border bg-background p-6 text-center">

                      <p className="text-sm uppercase tracking-wider text-muted-foreground">
                        Saldo pendiente
                      </p>

                      <p className="mt-2 text-3xl font-extrabold text-orange-600">
                        ${ordenSeleccionada.saldo_pendiente}
                      </p>

                    </div>

                  </div>

                </div>

              </CardContent>

            </Card>

          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="space-y-2">

              <label className="text-sm font-medium">
                Monto
              </label>

              <Input
                type="number"
                placeholder="Monto"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                className="h-16 text-3xl font-bold text-right"
              />

            </div>

            <div className="space-y-2">

              <label className="text-sm font-medium">
                Observaciones
              </label>

              <Input
                placeholder="Observaciones"
                value={observaciones}
                onChange={(e) =>
                  setObservaciones(e.target.value)
                }
                className="h-16"
              />

            </div>

          </div>

          <div className="flex justify-end">

            <Button
              onClick={createPayment}
              className="h-12 px-8"
            >
              Registrar pago
            </Button>

          </div>

        </CardContent>

      </Card>

      <Card>

        <CardHeader>

          <CardTitle>
            Historial de pagos
          </CardTitle>

        </CardHeader>

        <CardContent>

          <Table>

            <TableHeader>

              <TableRow>

                <TableHead>ID</TableHead>

                <TableHead>Orden</TableHead>

                <TableHead>Cliente</TableHead>

                <TableHead>Método</TableHead>

                <TableHead className="text-right">
                  Monto
                </TableHead>

              </TableRow>

            </TableHeader>

            <TableBody>

              {payments.map((payment) => (

                <TableRow key={payment.id_pago}>

                  <TableCell>
                    {payment.id_pago}
                  </TableCell>

                  <TableCell className="font-medium">
                    {payment.ordenes_compra?.numero_orden}
                  </TableCell>

                  <TableCell>
                    {payment.clientes?.razon_social ||
                      `${payment.clientes?.nombre ?? ""} ${payment.clientes?.apellido ?? ""}`}
                  </TableCell>

                  <TableCell>
                    {payment.metodo_pago}
                  </TableCell>

                  <TableCell className="text-right font-semibold">
                    ${payment.monto}
                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </CardContent>

      </Card>

    </div>

  );

}                  