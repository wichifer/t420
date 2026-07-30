import { Building2 } from "lucide-react";

import LoginForm from "../components/LoginForm";


export default function LoginPage() {

  return (

    <div className="min-h-screen flex">


      {/* =========================
          PANEL INFORMACIÓN DESKTOP
      ========================== */}

      <div
        className="
          hidden
          lg:flex
          flex-1
          bg-primary
          text-primary-foreground
          items-center
          justify-center
          p-10
        "
      >

        <div className="max-w-md">


          <div
            className="
              flex
              items-center
              gap-3
              mb-6
            "
          >

            <Building2
              size={52}
            />


            <div>

              <h1
                className="
                  text-4xl
                  font-bold
                "
              >
                T420 ERP
              </h1>


              <p
                className="
                  opacity-80
                "
              >
                Plataforma Multiempresa
              </p>


            </div>


          </div>



          <p
            className="
              text-lg
              opacity-90
              leading-relaxed
            "
          >
            Sistema integral para gestionar
            ventas, clientes, productos,
            stock y reportes desde cualquier
            dispositivo.
          </p>


        </div>


      </div>



      {/* =========================
          FORMULARIO LOGIN
      ========================== */}

      <div
        className="
          flex-1
          flex
          items-center
          justify-center
          p-6
        "
      >

        <div
          className="
            w-full
            max-w-md
          "
        >


          {/* Logo móvil */}

          <div
            className="
              flex
              lg:hidden
              justify-center
              mb-8
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <Building2
                size={42}
              />


              <div>

                <h1
                  className="
                    text-2xl
                    font-bold
                  "
                >
                  T420 ERP
                </h1>


                <p
                  className="
                    text-sm
                    text-muted-foreground
                  "
                >
                  SaaS
                </p>


              </div>


            </div>


          </div>



          <LoginForm />


        </div>


      </div>


    </div>

  );
}