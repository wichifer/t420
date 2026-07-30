import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Cash from "./pages/Cash";
import Payments from "./pages/Payments";
import Audit from "./pages/Audit";
import Playground from "./pages/Playground";
import CreateOrder from "./pages/CreateOrder";
import OrderDetail from "./pages/OrderDetail";
import Forbidden from "./pages/Forbidden";

import ProductsPage from "@/modules/products/pages/ProductsPage";
import ClientesPage from "@/modules/clientes/pages/ClientesPage";
import OrdersPage from "@/modules/orders/pages/OrdersPage";
import ReportsPage from "@/modules/reports/pages/ReportsPage";
import StockPage from "@/modules/stock/pages/StockPage";
import DashboardPage from "@/modules/dashboard/pages/DashboardPage";
import EmpresasPage from "@/modules/empresas/pages/EmpresasPage";

import LoginPage from "@/modules/auth/pages/LoginPage";

import EmpresaLayout from "./layouts/EmpresaLayout";
import SaaSLayout from "./layouts/SaaSLayout";
import PublicLayout from "./layouts/PublicLayout";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import GlobalModal from "./components/modals/GlobalModal";
import GlobalConfirmDialog from "./components/modals/GlobalConfirmDialog";
import GlobalLoading from "./components/GlobalLoading";

import { Toaster } from "sonner";


function App() {

  return (

    <>

      <Routes>


        {/* =========================
            RUTAS PÚBLICAS
        ========================== */}


        <Route element={<PublicLayout />}>


          <Route
            path="/"
            element={
              <Navigate
                to="/login"
                replace
              />
            }
          />


          <Route
            path="/login"
            element={<LoginPage />}
          />


        </Route>



        {/* =========================
            SIN PERMISOS
        ========================== */}


        <Route
          path="/403"
          element={<Forbidden />}
        />



        {/* =========================
            USUARIOS AUTENTICADOS
        ========================== */}


        <Route element={<ProtectedRoute />}>


          {/* =========================
              PANEL EMPRESA / ERP
          ========================== */}


          <Route element={<EmpresaLayout />}>


            <Route
              path="/dashboard"
              element={<Dashboard />}
            />


            <Route
              path="/clients"
              element={<ClientesPage />}
            />


            <Route
              path="/products"
              element={<ProductsPage />}
            />


            <Route
              path="/orders"
              element={<OrdersPage />}
            />


            <Route
              path="/orders/new"
              element={<CreateOrder />}
            />


            <Route
              path="/orders/:id"
              element={<OrderDetail />}
            />


            <Route
              path="/payments"
              element={<Payments />}
            />


            <Route
              path="/stock"
              element={<StockPage />}
            />


            <Route
              path="/reports"
              element={<ReportsPage />}
            />


            <Route
              path="/cash"
              element={<Cash />}
            />


            <Route
              path="/audit"
              element={<Audit />}
            />


            <Route
              path="/playground"
              element={<Playground />}
            />


          </Route>




          {/* =========================
              PANEL ADMIN SaaS
          ========================== */}


          <Route
            element={
              <ProtectedRoute
                roles={[
                  "ADMIN_SAAS",
                ]}
              />
            }
          >


            <Route element={<SaaSLayout />}>


              <Route
                path="/saas/dashboard"
                element={<DashboardPage />}
              />


              <Route
                path="/saas/empresas"
                element={<EmpresasPage />}
              />


            </Route>


          </Route>



        </Route>



        {/* =========================
            404 TEMPORAL
        ========================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />


      </Routes>



      {/* COMPONENTES GLOBALES */}


      <Toaster
        richColors
        position="top-right"
      />


      <GlobalLoading />


      <GlobalModal />


      <GlobalConfirmDialog />


    </>

  );

}


export default App;