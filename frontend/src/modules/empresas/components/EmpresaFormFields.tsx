// src/modules/empresas/components/EmpresaFormFields.tsx

import type { UseFormReturn } from "react-hook-form";
import type { EmpresaFormValues } from "../schemas/empresa.schema";

import { Input } from "@/components/ui/input";

interface EmpresaFormFieldsProps {
  form: UseFormReturn<EmpresaFormValues>;
  readonly?: boolean;
}

export default function EmpresaFormFields({
  form,
  readonly = false,
}: EmpresaFormFieldsProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-8">
      {/* ================= EMPRESA ================= */}

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">
          Datos de la empresa
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Input
              placeholder="Razón Social"
              disabled={readonly}
              {...register("razon_social")}
            />
            {errors.razon_social && (
              <p className="text-sm text-red-500">
                {errors.razon_social.message}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="CUIT"
              disabled={readonly}
              {...register("cuit")}
            />
            {errors.cuit && (
              <p className="text-sm text-red-500">
                {errors.cuit.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="email"
              placeholder="Email"
              disabled={readonly}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Teléfono"
              disabled={readonly}
              {...register("telefono")}
            />
          </div>

          <div>
            <Input
              placeholder="Dirección"
              disabled={readonly}
              {...register("direccion")}
            />
          </div>
        </div>
      </section>

      {/* ================= ADMINISTRADOR ================= */}

      <section className="space-y-4 border-t pt-6">
        <h3 className="text-lg font-semibold">
          Administrador
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Input
              placeholder="Nombre"
              disabled={readonly}
              {...register("nombre")}
            />
            {errors.nombre && (
              <p className="text-sm text-red-500">
                {errors.nombre.message}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Apellido"
              disabled={readonly}
              {...register("apellido")}
            />
            {errors.apellido && (
              <p className="text-sm text-red-500">
                {errors.apellido.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="email"
              placeholder="Email de acceso"
              disabled={readonly}
              {...register("usuario_email")}
            />
            {errors.usuario_email && (
              <p className="text-sm text-red-500">
                {errors.usuario_email.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Contraseña"
              disabled={readonly}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}