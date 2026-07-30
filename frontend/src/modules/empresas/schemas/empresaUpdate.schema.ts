import { z } from "zod";

export const empresaUpdateSchema = z.object({
  razon_social: z
    .string()
    .min(2, "La razón social es obligatoria"),

  cuit: z
    .string()
    .min(11, "El CUIT debe tener 11 dígitos")
    .max(11, "El CUIT debe tener 11 dígitos"),

  email: z
    .string()
    .email("Email inválido"),

  telefono: z
    .string()
    .optional(),

  direccion: z
    .string()
    .optional(),
});

export type EmpresaUpdateFormValues =
  z.infer<typeof empresaUpdateSchema>;