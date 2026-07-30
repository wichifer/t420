// src/pages/Dashboard.tsx

import { useEffect, useState } from "react";
import { api } from "../api/api";

import PageHeader from "@/components/common/PageHeader";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Package,
  Users,
  DollarSign,
  TriangleAlert,
  ShoppingCart,
  CreditCard,
  Plus,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();

  const [executive, setExecutive] = useState<any>(null);

  const [alerts, setAlerts] = useState<any>(null);

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

      try {

        const [
          executiveResponse,
          alertsResponse,
        ] = await Promise.all([

          api.get("/dashboard/executive"),

          api.get("/dashboard/alerts"),

        ]);

        setExecutive(
          executiveResponse.data
        );

        setAlerts(
          alertsResponse.data
        );

      } catch (error) {

        console.error(error);

      }

    };

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Buenos días"
      : hour < 19
      ? "Buenas tardes"
      : "Buenas noches";

  return (

    <div className="space-y-6">

      <PageHeader
        title="Dashboard Ejecutivo"
        description={`${greeting}. Bienvenido nuevamente al sistema.`}
      />

      {executive && (

        <>

          {/* ==========================
              KPIs
          ========================== */}

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

            <Card>

              <CardContent className="p-6">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-muted-foreground">
                      Stock Bajo
                    </p>

                    <p className="mt-2 text-4xl font-bold">
                      {executive.stock_bajo}
                    </p>

                  </div>

                  <Package className="h-10 w-10 text-orange-500" />

                </div>

              </CardContent>

            </Card>

            <Card>

              <CardContent className="p-6">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-muted-foreground">
                      Clientes Deudores
                    </p>

                    <p className="mt-2 text-4xl font-bold">
                      {executive.clientes_deudores}
                    </p>

                  </div>

                  <Users className="h-10 w-10 text-blue-600" />

                </div>

              </CardContent>

            </Card>

            <Card>

              <CardContent className="p-6">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-muted-foreground">
                      Saldo Pendiente
                    </p>

                    <p className="mt-2 text-3xl font-extrabold text-green-600">
                      $
                      {Number(
                        executive.saldo_total_clientes
                      ).toLocaleString()}
                    </p>

                  </div>

                  <DollarSign className="h-10 w-10 text-green-600" />

                </div>

              </CardContent>

            </Card>

            <Card>

              <CardContent className="p-6">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-muted-foreground">
                      Alertas
                    </p>

                    <p className="mt-2 text-4xl font-bold text-red-500">
                      {alerts
                        ? (
                            alerts.stock_bajo +
                            alerts.clientes_deudores
                          )
                        : 0}
                    </p>

                  </div>

                  <TriangleAlert className="h-10 w-10 text-red-500" />

                </div>

              </CardContent>

            </Card>

          </div>

          {/* ==========================
              ESTADO + ACCIONES
          ========================== */}

          <div className="grid gap-6 lg:grid-cols-2">

            <Card>

              <CardHeader>

                <CardTitle>
                  Estado General
                </CardTitle>

                <CardDescription>
                  Resumen actual de la empresa.
                </CardDescription>

              </CardHeader>

              <CardContent className="space-y-5">

                <div className="flex items-center justify-between">

                  <span>
                    Productos con stock bajo
                  </span>

                  <span className="text-xl font-bold text-orange-600">
                    {executive.stock_bajo}
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span>
                    Clientes deudores
                  </span>

                  <span className="text-xl font-bold text-blue-600">
                    {executive.clientes_deudores}
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span>
                    Saldo pendiente
                  </span>

                  <span className="text-xl font-bold text-green-600">
                    $
                    {Number(
                      executive.saldo_total_clientes
                    ).toLocaleString()}
                  </span>

                </div>

              </CardContent>

            </Card>

            <Card>

              <CardHeader>

                <CardTitle>
                  Acciones rápidas
                </CardTitle>

                <CardDescription>
                  Accesos directos a las tareas más frecuentes.
                </CardDescription>

              </CardHeader>

              <CardContent className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2"
                  onClick={() => navigate("/orders")}
                >
                  <ShoppingCart className="h-6 w-6" />
                  Nueva Orden
                </Button>

                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2"
                  onClick={() => navigate("/payments")}
                >
                  <CreditCard className="h-6 w-6" />
                  Registrar Pago
                </Button>

                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2"
                  onClick={() => navigate("/clientes")}
                >
                  <Users className="h-6 w-6" />
                  Nuevo Cliente
                </Button>

                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2"
                  onClick={() => navigate("/products")}
                >
                  <Plus className="h-6 w-6" />
                  Nuevo Producto
                </Button>

              </CardContent>

            </Card>

          </div>

          {/* ==========================
              ALERTAS
          ========================== */}

          <Card>

            <CardHeader>

              <CardTitle>
                Centro de Alertas
              </CardTitle>

              <CardDescription>
                Situaciones que requieren atención.
              </CardDescription>

            </CardHeader>

            <CardContent className="space-y-4">

              <div className="flex items-center justify-between rounded-lg border p-4">

                <div className="flex items-center gap-3">

                  <Package className="h-6 w-6 text-orange-500" />

                  <div>

                    <p className="font-medium">
                      Productos con stock bajo
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Requieren reposición.
                    </p>

                  </div>

                </div>

                <span className="text-2xl font-bold text-orange-600">
                  {alerts.stock_bajo}
                </span>

              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">

                <div className="flex items-center gap-3">

                  <Users className="h-6 w-6 text-blue-600" />

                  <div>

                    <p className="font-medium">
                      Clientes con deuda
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Requieren seguimiento.
                    </p>

                  </div>

                </div>

                <span className="text-2xl font-bold text-blue-600">
                  {alerts.clientes_deudores}
                </span>

              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">

                <div className="flex items-center gap-3">

                  <DollarSign className="h-6 w-6 text-green-600" />

                  <div>

                    <p className="font-medium">
                      Saldo pendiente
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Total por cobrar.
                    </p>

                  </div>

                </div>

                <span className="text-2xl font-bold text-green-600">
                  $
                  {Number(
                    alerts.saldo_total_clientes
                  ).toLocaleString()}
                </span>

              </div>

            </CardContent>

          </Card>

        </>

      )}

    </div>

  );

}