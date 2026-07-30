//src/pages/Orders.tsx
import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { Link } from 'react-router-dom';

export default function Orders() {

  const [orders, setOrders] =
    useState<any[]>([]);

  useEffect(() => {

    loadOrders();

  }, []);

  const loadOrders =
    async () => {

      try {

        const response =
          await api.get(
            '/orders',
          );

        setOrders(
          response.data,
        );

      } catch (error) {

        console.error(error);

      }

    };

  const approveOrder =
    async (id: string) => {

      try {

        await api.patch(
          `/orders/${id}`,
          {
            estado:
              'APROBADA',
          },
        );

        alert(
          'Orden aprobada',
        );

        loadOrders();

      } catch (error: any) {

        console.error(error);

        alert(
          error.response?.data?.message ||
          'Error',
        );

      }

    };

  const cancelOrder =
    async (id: string) => {

      try {

        await api.patch(
          `/orders/${id}`,
          {
            estado:
              'ANULADA',
          },
        );

        alert(
          'Orden anulada',
        );

        loadOrders();

      } catch (error: any) {

        console.error(error);

        alert(
          error.response?.data?.message ||
          'Error',
        );

      }

    };

  return (

    <div>

      <h1>
        Órdenes
      </h1>

      <div style={{ marginBottom: '15px' }}>
        <Link to="/orders/new">
          <button>Nueva Orden</button>
        </Link>
      </div>
      <table border={1}>

        <thead>

          <tr>

            <th>Número</th>

            <th>Cliente</th>

            <th>Estado</th>

            <th>Total</th>

            <th>Fecha</th>

            <th>Acciones</th>

          </tr>

        </thead>

        <tbody>

          {orders.map(
            (order) => (

              <tr
                key={
                  order.id_orden_compra
                }
              >

                <td>
                  {
                    order.numero_orden
                  }
                </td>

                <td>

                  {
                    order.clientes?.nombre
                  }

                  {' '}

                  {
                    order.clientes?.apellido
                  }

                </td>

                <td>
                  {
                    order.estado
                  }
                </td>

                <td>

                  $

                  {
                    order.total
                  }

                </td>

                <td>

                  {new Date(
                    order.fecha,
                  ).toLocaleDateString()}

                </td>
<td>


  {order.estado === 'PENDIENTE' && (

    <>
      <button
        onClick={() =>
          approveOrder(
            order.id_orden_compra,
          )
        }
      >
        Aprobar
      </button>

      {' '}

      <button
        onClick={() =>
          cancelOrder(
            order.id_orden_compra,
          )
        }
      >
        Anular
      </button>
    </>

  )}

{order.estado === 'APROBADA' && (

  <>
    <Link
      to={`/orders/${order.id_orden_compra}`}
    >
      Ver
    </Link>

    {' '}

    <Link
      to={`/payments?order=${order.id_orden_compra}`}
    >
      Pagar
    </Link>

    {' '}

    <button
      onClick={() =>
        cancelOrder(
          order.id_orden_compra,
        )
      }
    >
      Anular
    </button>
  </>

)}

  {order.estado === 'ANULADA' && (

    <>
      {' '}
      <span>
        Anulada
      </span>
    </>

  )}

</td>
              </tr>

            ),
          )}

        </tbody>

      </table>

    </div>

  );

}