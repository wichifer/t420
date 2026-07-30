import { z } from "zod";

export const updateEmpresaSchema = z.object({
  razon_social: z.string().min(2),

  cuit: z
    .string()
    .length(11),

  email: z.string().email(),

  telefono: z.string().optional(),

  direccion: z.string().optional(),

  estado: z.boolean().optional(),
});

export type UpdateEmpresaFormValues =
  z.infer<typeof updateEmpresaSchema>;