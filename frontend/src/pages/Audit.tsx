import { useEffect, useState } from 'react';
import { api } from '../api/api';

export default function Audit() {

  const [logs, setLogs] =
    useState<any[]>([]);

  useEffect(() => {

    loadAudit();

  }, []);

  const loadAudit =
    async () => {

      try {

        const response =
          await api.get('/audit');

        setLogs(
          response.data,
        );

      } catch (error) {

        console.error(error);

      }

    };

  return (

    <div>

      <h1>
        Auditoría
      </h1>

      <table border={1}>

        <thead>

          <tr>

            <th>ID</th>

            <th>Fecha</th>

            <th>Usuario</th>

            <th>Acción</th>

            <th>Tabla</th>

            <th>Registro</th>

            <th>IP</th>

          </tr>

        </thead>

        <tbody>

          {logs.map(
            (log) => (

              <tr
                key={
                  log.id_log
                }
              >

                <td>
                  {
                    log.id_log
                  }
                </td>

                <td>

                  {new Date(
                    log.fecha,
                  ).toLocaleString()}

                </td>

                <td>

                  {
                    log.usuarios?.nombre
                  }

                  {' '}

                  {
                    log.usuarios?.apellido
                  }

                </td>

                <td>
                  {
                    log.accion
                  }
                </td>

                <td>
                  {
                    log.tabla_afectada
                  }
                </td>

                <td>
                  {
                    log.registro_id
                  }
                </td>

                <td>

                  {
                    log.ip_origen ||
                    '-'
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