import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/modules/auth/store/authStore";


interface Props {
  roles?: string[];
}


export default function ProtectedRoute({
  roles,
}: Props) {


  const {
    token,
    usuario,
  } = useAuthStore();


  if (!token) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  if (
    roles &&
    usuario &&
    !roles.includes(usuario.rol)
  ) {

    return (
      <Navigate
        to="/403"
        replace
      />
    );

  }


  return <Outlet />;

}