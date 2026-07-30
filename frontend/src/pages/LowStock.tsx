import { useEffect, useState } from 'react';
import { api } from '../api/api';

export default function LowStock() {

  const [products, setProducts] =
    useState<any[]>([]);

  useEffect(() => {

    loadProducts();

  }, []);

  const loadProducts =
    async () => {

      try {

        const response =
          await api.get(
            '/products/low-stock',
          );

        setProducts(
          response.data,
        );

      } catch (error) {

        console.error(error);

      }

    };

  return (

    <div>

      <h1>
        Productos con Stock Bajo
      </h1>

      <table border={1}>

        <thead>

          <tr>

            <th>
              Código
            </th>

            <th>
              Descripción
            </th>

            <th>
              Stock Actual
            </th>

            <th>
              Stock Mínimo
            </th>

          </tr>

        </thead>

        <tbody>

          {products.map(
            (product) => (

              <tr
                key={
                  product.id_articulo
                }
              >

                <td>
                  {product.codigo}
                </td>

                <td>
                  {product.descripcion}
                </td>

                <td>
                  {product.stock_actual}
                </td>

                <td>
                  {product.stock_minimo}
                </td>

              </tr>

            ),
          )}

        </tbody>

      </table>

    </div>

  );

}