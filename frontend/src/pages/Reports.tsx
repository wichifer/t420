import { useEffect, useState } from 'react';
import { api } from '../api/api';

export default function Reports() {

  const [sales, setSales] =
    useState<any>(null);

  const [salesByClient, setSalesByClient] =
    useState<any[]>([]);

  const [topProducts, setTopProducts] =
    useState<any[]>([]);

  const [debtors, setDebtors] =
    useState<any[]>([]);

  useEffect(() => {

    loadReports();

  }, []);

  const loadReports =
    async () => {

      try {

        const [
          salesRes,
          clientsRes,
          productsRes,
          debtorsRes,
        ] = await Promise.all([

          api.get('/reports/sales'),

          api.get(
            '/reports/sales-by-client',
          ),

          api.get(
            '/reports/top-products',
          ),

          api.get(
            '/reports/debtors',
          ),

        ]);

        setSales(
          salesRes.data,
        );

        setSalesByClient(
          clientsRes.data,
        );

        setTopProducts(
          productsRes.data,
        );

        setDebtors(
          debtorsRes.data,
        );

      } catch (error) {

        console.error(error);

      }

    };

  return (

    <div>

      <h1>
        Reportes
      </h1>

      {/* KPIs */}

      <h2>
        Ventas
      </h2>

      {sales && (

        <table border={1}>

          <tbody>

            <tr>

              <td>
                Cantidad órdenes
              </td>

              <td>
                {
                  sales.cantidad_ordenes
                }
              </td>

            </tr>

            <tr>

              <td>
                Ventas
              </td>

              <td>

                $

                {
                  sales.ventas
                }

              </td>

            </tr>

            <tr>

              <td>
                Clientes
              </td>

              <td>

                {
                  sales.clientes
                }

              </td>

            </tr>

          </tbody>

        </table>

      )}

      <br />

      {/* Ventas por cliente */}

      <h2>
        Ventas por Cliente
      </h2>

      <table border={1}>

        <thead>

          <tr>

            <th>
              Cliente
            </th>

            <th>
              Ventas
            </th>

          </tr>

        </thead>

        <tbody>

          {salesByClient.map(
            (item) => (

              <tr
                key={
                  item.id_cliente
                }
              >

                <td>
                  {
                    item.cliente
                  }
                </td>

                <td>

                  $

                  {
                    item.ventas
                  }

                </td>

              </tr>

            ),
          )}

        </tbody>

      </table>

      <br />

      {/* Top productos */}

      <h2>
        Productos Más Vendidos
      </h2>

      <table border={1}>

        <thead>

          <tr>

            <th>
              Producto
            </th>

            <th>
              Cantidad
            </th>

          </tr>

        </thead>

        <tbody>

          {topProducts.map(
            (
              item,
              index,
            ) => (

              <tr
                key={index}
              >

                <td>

                  {
                    item.descripcion_articulo
                  }

                </td>

                <td>

                  {
                    item.cantidad_vendida
                  }

                </td>

              </tr>

            ),
          )}

        </tbody>

      </table>

      <br />

      {/* Deudores */}

      <h2>
        Deudores
      </h2>

      <table border={1}>

        <thead>

          <tr>

            <th>
              Cliente
            </th>

            <th>
              Saldo
            </th>

          </tr>

        </thead>

        <tbody>

          {debtors.map(
            (item) => (

              <tr
                key={
                  item.id_cliente
                }
              >

                <td>

                  {
                    item.cliente
                  }

                </td>

                <td>

                  $

                  {
                    item.saldo
                  }

                </td>

              </tr>

            ),
          )}

        </tbody>

      </table>

    </div>

  );

}