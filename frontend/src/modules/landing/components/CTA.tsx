import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24">
      <div className="container mx-auto text-center space-y-6">
        <h2 className="text-4xl font-bold">
          ¿Listo para comenzar?
        </h2>

        <p className="text-muted-foreground">
          Probá T420 ERP/POS en minutos.
        </p>

        <Button size="lg">
          Comenzar ahora
        </Button>
      </div>
    </section>
  );
}