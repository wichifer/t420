import { useEffect, useState } from 'react';
import { api } from '../api/api';

export default function StockMovements() {

const [movements, setMovements] =
useState<any[]>([]);

const [products, setProducts] =
useState<any[]>([]);

const [idArticulo, setIdArticulo] =
useState('');

const [tipo, setTipo] =
useState('ENTRADA');

const [cantidad, setCantidad] =
useState('');

const [referencia, setReferencia] =
useState('');

useEffect(() => {


loadMovements();

loadProducts();


}, []);

const loadMovements =
async () => {


  try {

    const response =
      await api.get(
        '/stock-movements',
      );

    setMovements(
      response.data,
    );

  } catch (error) {

    console.error(error);

  }

};


const loadProducts =
async () => {


  try {

    const response =
      await api.get(
        '/products',
      );

    setProducts(
      response.data,
    );

  } catch (error) {

    console.error(error);

  }

};


const createMovement =
async () => {

  try {

    if (!idArticulo) {

      alert(
        'Seleccione un producto',
      );

      return;

    }

    if (
      Number(cantidad) <= 0
    ) {

      alert(
        'Cantidad inválida',
      );

      return;

    }

    await api.post(
      '/stock-movements/manual',
      {
        id_articulo:
          idArticulo,

        tipo_movimiento:
          tipo,

        cantidad:
          Number(cantidad),

        referencia,
      },
    );

    alert(
      'Movimiento creado',
    );

    setIdArticulo('');

    setCantidad('');

    setReferencia('');

    loadMovements();

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
    Movimientos de Stock
  </h1>

  <hr />

  <h2>
    Movimiento Manual
  </h2>

  <select
    value={idArticulo}
    onChange={(e) =>
      setIdArticulo(
        e.target.value,
      )
    }
  >

    <option value="">
      Seleccionar Producto
    </option>

    {products.map(
      (product) => (

        <option
          key={
            product.id_articulo
          }
          value={
            product.id_articulo
          }
        >

          {product.codigo}
          {' - '}
          {product.descripcion}

        </option>

      ),
    )}

  </select>

  {' '}

  <select
    value={tipo}
    onChange={(e) =>
      setTipo(
        e.target.value,
      )
    }
  >

    <option value="ENTRADA">
      ENTRADA
    </option>

    <option value="SALIDA">
      SALIDA
    </option>

  </select>

  {' '}

  <input
    placeholder="Cantidad"
    value={cantidad}
    onChange={(e) =>
      setCantidad(
        e.target.value,
      )
    }
  />

  {' '}

  <input
    placeholder="Referencia"
    value={referencia}
    onChange={(e) =>
      setReferencia(
        e.target.value,
      )
    }
  />

  {' '}

  <button
    onClick={createMovement}
  >
    Guardar
  </button>

  <hr />

  <table border={1}>

    <thead>

      <tr>

        <th>
          ID Artículo
        </th>

        <th>
          Fecha
        </th>

        <th>
          Tipo
        </th>

        <th>
          Producto
        </th>

        <th>
          Código
        </th>

        <th>
          Cantidad
        </th>

        <th>
          Referencia
        </th>

      </tr>

    </thead>

    <tbody>

      {movements.map(
        (movement) => (

          <tr
            key={
              movement.id_movimiento_stock
            }
          >

            <td>
              {
                movement.id_articulo
              }
            </td>

            <td>

              {new Date(
                movement.fecha,
              ).toLocaleString()}

            </td>

            <td>
              {
                movement.tipo_movimiento
              }
            </td>

            <td>

              {
                movement.articulos
                  ?.descripcion
              }

            </td>

            <td>

              {
                movement.articulos
                  ?.codigo
              }

            </td>

            <td>
              {
                movement.cantidad
              }
            </td>

            <td>
              {
                movement.referencia
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
