export default function Features() {

  const features = [
    {
      title: "Ventas",
      description:
        "Gestiona órdenes, pagos y clientes desde un único sistema.",
    },
    {
      title: "Stock",
      description:
        "Controla inventario y movimientos en tiempo real.",
    },
    {
      title: "Multiempresa",
      description:
        "Administra múltiples empresas con usuarios y permisos.",
    },
  ];


  return (

    <section
      className="
        grid
        gap-6
        md:grid-cols-3
      "
    >

      {
        features.map((feature) => (

          <div
            key={feature.title}
            className="
              rounded-xl
              border
              p-6
              bg-background
            "
          >

            <h3
              className="
                text-lg
                font-semibold
                mb-2
              "
            >
              {feature.title}
            </h3>


            <p
              className="
                text-sm
                text-muted-foreground
              "
            >
              {feature.description}
            </p>


          </div>

        ))
      }

    </section>

  );

}