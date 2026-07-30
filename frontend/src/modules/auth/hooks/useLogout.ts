import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/authStore";


export function useLogout() {

  const navigate = useNavigate();


  const logout =
    useAuthStore(
      (state) => state.logout
    );


  const executeLogout = () => {

    logout();


    navigate(
      "/login",
      {
        replace: true,
      }
    );

  };


  return {
    executeLogout,
  };

}