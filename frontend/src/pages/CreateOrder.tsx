import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function CreateOrder() {

  const [clients, setClients] =
    useState<any[]>([]);

  const [products, setProducts] =
    useState<any[]>([]);

  const [clientId, setClientId] =
    useState('');

  const [search, setSearch] =
    useState('');

  const [items, setItems] =
    useState<any[]>([]);

  const navigate = useNavigate();
  useEffect(() => {

    loadClients();
    loadProducts();

  }, []);

  const loadClients =
    async () => {

      const response =
        await api.get(
          '/clients',
        );

      setClients(
        response.data,
      );

    };

  const loadProducts =
    async () => {

      const response =
        await api.get(
          '/products',
        );

      setProducts(
        response.data,
      );

    };



  const total =
    items.reduce(

      (sum, item) =>

        sum +

        item.cantidad *
        item.precio_unitario,

      0,

    );

  const saveOrder =
    async () => {

      try {

        await api.post(
          '/orders',
          {
            id_cliente:
              clientId,

            observaciones:
              '',

            items,
          },
        );

        alert(
          'Orden creada',
        );
        setClientId('');
        setItems([]);
      } catch (error) {

        console.error(error);

      }

    };
  const saveApproveAndPay = async () => {
    try {
      // Validar antes de crear la orden
      if (!clientId) {
        alert('Debe seleccionar un cliente');
        return;
      }

      if (items.length === 0) {
        alert('Debe agregar al menos un producto');
        return;
      }

      if (total <= 0) {
        alert('El total debe ser mayor a cero');
        return;
      }

      const selectedClient = clients.find(
        (c) => String(c.id_cliente) === String(clientId),
      );

      // Crear la orden y aprobarla automáticamente
      const response = await api.post('/orders', {
        id_cliente: clientId,
        observaciones: '',
        items,
        aprobar_automaticamente: true,
      });

      const orderId = response.data.id_orden_compra;
      // 3. Si es Consumidor Final, cobrar automáticamente
      if (selectedClient?.es_consumidor_final) {
        await api.post('/payments', {
          id_orden_compra: String(orderId),
          monto: total.toFixed(2),
          metodo_pago: 'EFECTIVO',
          observaciones: 'Pago automático Consumidor Final',
        });

        alert('Venta al contado registrada correctamente');

        setClientId('');
        setItems([]);

        navigate('/orders');
        return;
      }

      // 4. Cliente común: ir a pantalla de pagos
      setClientId('');
      setItems([]);

      navigate(`/payments?order=${orderId}`);

    } catch (error: any) {
      console.error('ERROR COMPLETO:', error);

      alert(
        error?.response?.data?.message ||
        'Error al guardar, aprobar y cobrar',
      );
    }
  };
  const filteredProducts =
    products.filter(
      (p) =>
        p.descripcion
          .toLowerCase()
          .includes(
            search.toLowerCase(),
          ) ||
        p.codigo
          ?.toLowerCase()
          .includes(
            search.toLowerCase(),
          ),
    );
  const addProduct =
    (product: any) => {

      const existente =
        items.find(
          (i) =>
            i.id_articulo ===
            product.id_articulo,
        );

      if (existente) {

        setItems(
          items.map((i) =>
            i.id_articulo ===
              product.id_articulo
              ? {
                ...i,
                cantidad:
                  i.cantidad + 1,
              }
              : i,
          ),
        );

      } else {

        setItems([
          ...items,
          {
            id_articulo:
              product.id_articulo,
            descripcion_articulo:
              product.descripcion,
            cantidad:
              product.unidad_medida === 'KG'
                ? 0.001
                : 1,
            precio_unitario:
              Number(
                product.precio_final,
              ),
          },
        ]);

      }

      setSearch('');

    };
  return (

    <div>

      <h1>
        Nueva Orden
      </h1>

      <select
        value={clientId}
        onChange={(e) =>
          setClientId(
            e.target.value,
          )
        }
      >

        <option value="">
          Cliente
        </option>

        {clients.map(
          (client) => (

            <option
              key={
                client.id_cliente
              }
              value={
                client.id_cliente
              }
            >

              {client.nombre}
              {' '}
              {client.apellido}

            </option>

          ),
        )}

      </select>

      <br />
      <br />

      <input
        placeholder="🔎 Buscar producto..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value,
          )
        }
      />

      <div
        style={{
          maxHeight: '200px',
          overflowY: 'auto',
          border: '1px solid #ccc',
          marginTop: '10px',
        }}
      >

        {search !== '' &&
          filteredProducts.map(
            (product) => (

              <div
                key={
                  product.id_articulo
                }
                style={{
                  padding: '8px',
                  cursor: 'pointer',
                }}
                onClick={() =>
                  addProduct(
                    product,
                  )
                }
              >

                <strong>
                  {
                    product.descripcion
                  }
                </strong>

                {' - $'}

                {
                  product.precio_final
                }

                {' - Stock: '}

                {
                  product.stock_actual
                }

              </div>

            ),
          )}

      </div>
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

            <th>Unidad</th>

          </tr>

        </thead>

        <tbody>

          {items.map(
            (item, index) => (

              <tr key={index}>

                <td>
                  {item.descripcion_articulo}
                </td>

                <td>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={item.cantidad}
                    onChange={(e) =>
                      setItems(
                        items.map((i) =>
                          i.id_articulo === item.id_articulo
                            ? {
                              ...i,
                              cantidad: Number(e.target.value),
                            }
                            : i,
                        ),
                      )
                    }
                    style={{ width: '80px' }}
                  />

                </td>

                <td>
                  ${item.precio_unitario}
                </td>

                <td>
                  $
                  {item.cantidad *
                    item.precio_unitario}
                </td>
                <td>{item.unidad_medida}</td>

              </tr>

            ),
          )}

        </tbody>

      </table>



      <hr />

      <h2>

        Total: $

        {total}

      </h2>

      <button
        type="button"
        onClick={saveOrder}
      >

        💾 Guardar Borrador

      </button>

      {' '}

      <button
        type="button"
        onClick={
          saveApproveAndPay
        }
      >

        🟢 Finalizar Venta

      </button>

    </div>

  );

}