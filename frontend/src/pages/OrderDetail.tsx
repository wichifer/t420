import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/api';

export default function OrderDetail() {

  const { id } = useParams();

  const [order, setOrder] =
    useState<any>(null);

  useEffect(() => {

    loadOrder();

  }, []);

  const loadOrder =
    async () => {

      try {

        const response =
          await api.get(
            `/orders/${id}`,
          );

        setOrder(
          response.data,
        );

      } catch (error) {

        console.error(error);

      }

    };

  if (!order)
    return <p>Cargando...</p>;

  return (

    <div>

      <h1>

        Orden

        {' '}

        {order.numero_orden}

      </h1>

      <hr />

      <p>

        <b>Cliente:</b>

        {' '}

        {order.clientes?.nombre}

        {' '}

        {order.clientes?.apellido}

      </p>

      <p>

        <b>Estado:</b>

        {' '}

        {order.estado}

      </p>

      <p>

        <b>Total:</b>

        {' '}

        ${order.total}

      </p>

      <p>

        <b>Vendedor:</b>

        {' '}

        {order.usuarios?.nombre}

        {' '}

        {order.usuarios?.apellido}

      </p>

      <hr />

      <h2>
        Items
      </h2>

      <table border={1}>

        <thead>

          <tr>

            <th>Producto</th>

            <th>Cantidad</th>

            <th>Precio</th>

            <th>Subtotal</th>

          </tr>

        </thead>

        <tbody>

          {order.detalle_orden_compra.map(
            (item: any) => (

              <tr
                key={
                  item.id_detalle_orden
                }
              >

                <td>

                  {
                    item.descripcion_articulo
                  }

                </td>

                <td>

                  {
                    item.cantidad
                  }

                </td>

                <td>

                  $

                  {
                    item.precio_unitario
                  }

                </td>

                <td>

                  $

                  {
                    item.subtotal
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