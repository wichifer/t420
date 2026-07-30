import { useEffect, useState } from 'react';
import { api } from '../api/api';

export default function Cash() {

  const [cash, setCash] =
    useState<any>(null);

  const [history, setHistory] =
    useState<any[]>([]);

  const [amount, setAmount] =
    useState('');

  useEffect(() => {

    loadCash();

    loadHistory();

  }, []);

  const loadCash =
    async () => {

      try {

        const response =
          await api.get(
            '/cash/current',
          );

        setCash(
          response.data,
        );

      } catch (error) {

        console.error(error);

        setCash(null);

      }

    };

  const loadHistory =
    async () => {

      try {

        const response =
          await api.get(
            '/cash/history',
          );

        setHistory(
          response.data,
        );

      } catch (error) {

        console.error(error);

      }

    };

  const openCash =
    async () => {

      try {

        await api.post(
          '/cash/open',
          {
            saldo_inicial:
              Number(amount),
          },
        );

        alert(
          'Caja abierta',
        );

        loadCash();

        loadHistory();

      } catch (error: any) {

        console.error(error);

        alert(
          error.response?.data?.message ||
          'Error',
        );

      }

    };

const closeCash =
  async () => {

    const saldoFinal =
      prompt(
        'Ingrese saldo final',
      );

    if (
      !saldoFinal
    ) return;

    try {

      await api.post(
        '/cash/close',
        {
          saldo_final:
            Number(
              saldoFinal,
            ),
        },
      );

      alert(
        'Caja cerrada',
      );

      loadCash();

      loadHistory();

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
        Caja
      </h1>

      {!cash && (

        <div>

          <input
            placeholder="Saldo Inicial"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value,
              )
            }
          />

          <button
            onClick={openCash}
          >
            Abrir Caja
          </button>

        </div>

      )}

      {cash && (

        <div>

          <p>

            <b>Estado:</b>

            {' '}

            {cash.estado}

          </p>

          <p>

            <b>Saldo Inicial:</b>

            {' '}

            ${cash.saldo_inicial}

          </p>

          <p>

            <b>Fecha Apertura:</b>

            {' '}

            {new Date(
              cash.fecha_apertura,
            ).toLocaleString()}

          </p>

          <button
            onClick={closeCash}
          >
            Cerrar Caja
          </button>

        </div>

      )}

      <hr />

      <h2>
        Historial
      </h2>

      <table border={1}>

        <thead>

          <tr>

            <th>ID</th>

            <th>Apertura</th>

            <th>Cierre</th>

            <th>Inicial</th>

            <th>Final</th>

            <th>Estado</th>

          </tr>

        </thead>

        <tbody>

          {history.map(
            (item) => (

              <tr
                key={
                  item.id_caja
                }
              >

                <td>
                  {item.id_caja}
                </td>

                <td>

                  {new Date(
                    item.fecha_apertura,
                  ).toLocaleString()}

                </td>

                <td>

                  {item.fecha_cierre

                    ? new Date(
                        item.fecha_cierre,
                      ).toLocaleString()

                    : '-'}

                </td>

                <td>

                  ${item.saldo_inicial}

                </td>

                <td>

                  {item.saldo_final

                    ? `$${item.saldo_final}`

                    : '-'}

                </td>

                <td>

                  {item.estado}

                </td>

              </tr>

            ),
          )}

        </tbody>

      </table>

    </div>

  );

}