import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/api';

export default function EditClient() {

  const { id } = useParams();

  const [nombre, setNombre] =
    useState('');

  const [apellido, setApellido] =
    useState('');

  const [email, setEmail] =
    useState('');

  useEffect(() => {

    loadClient();

  }, []);

  const loadClient =
    async () => {

      try {

        const response =
          await api.get(
            `/clients/${id}`,
          );

        const client =
          response.data;

        setNombre(
          client.nombre ?? '',
        );

        setApellido(
          client.apellido ?? '',
        );

        setEmail(
          client.email ?? '',
        );

      } catch (error) {

        console.error(error);

      }

    };

  const saveClient =
    async () => {

      try {

        await api.patch(
          `/clients/${id}`,
          {
            nombre,
            apellido,
            email,
          },
        );

        alert(
          'Cliente actualizado',
        );

      } catch (error) {

        console.error(error);

        alert(
          'Error al actualizar',
        );

      }

    };

  return (

    <div>

      <h1>
        Editar Cliente
      </h1>

      <input
        value={nombre}
        onChange={(e) =>
          setNombre(
            e.target.value,
          )
        }
        placeholder="Nombre"
      />

      <br />

      <input
        value={apellido}
        onChange={(e) =>
          setApellido(
            e.target.value,
          )
        }
        placeholder="Apellido"
      />

      <br />

      <input
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value,
          )
        }
        placeholder="Email"
      />

      <br />

      <button
        onClick={saveClient}
      >
        Guardar Cambios
      </button>

    </div>

  );

}