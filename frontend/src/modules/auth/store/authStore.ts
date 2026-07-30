import { create } from "zustand";


interface Usuario {

  id_usuario: string;

  email: string;

  nombre?: string;

  rol: string;

  id_empresa?: string;

}


interface AuthState {

  token: string | null;

  usuario: Usuario | null;


  login: (
    token: string,
    usuario: Usuario,
    remember: boolean
  ) => void;


  logout: () => void;

}



const getStorage =
  () => {

    const token =
      localStorage.getItem("token")
      ||
      sessionStorage.getItem("token");


    const usuario =
      localStorage.getItem("usuario")
      ||
      sessionStorage.getItem("usuario");


    return {

      token,

      usuario:
        usuario
        ? JSON.parse(usuario)
        : null,

    };

  };



const saved =
  getStorage();



export const useAuthStore =
create<AuthState>((set) => ({


  token:
    saved.token,


  usuario:
    saved.usuario,



  login:
    (
      token,
      usuario,
      remember
    ) => {


      const storage =
        remember
          ? localStorage
          : sessionStorage;



      storage.setItem(
        "token",
        token
      );


      storage.setItem(
        "usuario",
        JSON.stringify(usuario)
      );


      set({

        token,

        usuario,

      });


    },



  logout:
    () => {


      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "usuario"
      );


      sessionStorage.removeItem(
        "token"
      );

      sessionStorage.removeItem(
        "usuario"
      );


      set({

        token:null,

        usuario:null,

      });


    },


}));