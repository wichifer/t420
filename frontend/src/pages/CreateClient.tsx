import { useState } from 'react';
import { api } from '../api/api';

export default function CreateClient() {

  const [nombre, setNombre] =
    useState('');

  const [apellido, setApellido] =
    useState('');

  const [email, setEmail] =
    useState('');

  const saveClient =
    async () => {

      try {

        await api.post(
          '/clients',
          {
            nombre,
            apellido,
            email,
          },
        );

        alert(
          'Cliente creado',
        );
        setNombre('');
        setApellido('');
        setEmail('');

      } catch (error) {

        console.error(error);

        alert(
          'Error al crear',
        );

      }

    };

  return (

    <div>

      <h1>
        Nuevo Cliente
      </h1>

      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) =>
          setNombre(
            e.target.value,
          )
        }
      />

      <br />

      <input
        placeholder="Apellido"
        value={apellido}
        onChange={(e) =>
          setApellido(
            e.target.value,
          )
        }
      />

      <br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value,
          )
        }
      />

      <br />

      <button
        onClick={saveClient}
      >
        Guardar
      </button>

    </div>

  );

}