import { api } from "@/api/api";
import { useAuthStore } from "../store/authStore";

export function useLogin() {

  const login =
    useAuthStore(
      state => state.login
    );


const executeLogin = async (
  email:string,
  password:string,
  remember:boolean
) => {

    const response =
      await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );


login(
  response.data.token,
  response.data.usuario,
  remember
);


    return response.data.usuario;
  };


  return {
    executeLogin,
  };
}