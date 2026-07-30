import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import { ShieldAlert } from "lucide-react";


export default function Forbidden() {

  const navigate = useNavigate();


  return (

    <div
      className="
        min-h-screen
        flex
        flex-col
        items-center
        justify-center
        gap-5
        p-6
        text-center
      "
    >

      <ShieldAlert
        size={64}
        className="text-muted-foreground"
      />


      <h1
        className="
          text-6xl
          font-bold
        "
      >
        403
      </h1>


      <h2
        className="
          text-xl
          font-semibold
        "
      >
        Acceso restringido
      </h2>


      <p
        className="
          max-w-md
          text-muted-foreground
        "
      >
        Tu usuario no tiene permisos suficientes
        para acceder a esta sección del sistema.
      </p>


      <Button
        onClick={() =>
          navigate("/dashboard")
        }
      >
        Volver al Dashboard
      </Button>


    </div>

  );

}