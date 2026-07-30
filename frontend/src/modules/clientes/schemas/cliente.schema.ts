//src/modules/clientes/schemas/cliente.schema.ts
import { z } from "zod";

export const clienteSchema = z
  .object({
    nombre: z
      .string()
      .optional(),

    apellido: z
      .string()
      .optional(),

    razon_social: z
      .string()
      .optional(),

    documento: z
      .string()
      .optional(),

    cuit: z
      .string()
      .optional(),

    telefono: z
      .string()
      .optional(),

    email: z
      .string()
      .email("Email inválido")
      .optional()
      .or(z.literal("")),

    direccion: z
      .string()
      .optional(),

    es_consumidor_final: z
      .boolean()


  })
  .refine(
    (data) =>
      Boolean(data.nombre?.trim()) ||
      Boolean(data.razon_social?.trim()),

    {
      message:
        "Debe ingresar un nombre o una razón social.",
      path: ["nombre"],
    }
  );


export type ClienteFormValues =
  z.infer<typeof clienteSchema>;