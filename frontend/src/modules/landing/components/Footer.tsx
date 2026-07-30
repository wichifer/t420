export default function Footer() {

  return (

    <footer
      className="
        border-t
        mt-20
        py-8
        text-center
        text-sm
        text-muted-foreground
      "
    >

      <p>
        © {new Date().getFullYear()} T420 SaaS.
        Todos los derechos reservados.
      </p>


    </footer>

  );

}