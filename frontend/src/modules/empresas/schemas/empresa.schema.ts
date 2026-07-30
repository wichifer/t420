// src/modules/empresas/schemas/empresa.schema.ts
import { z } from "zod";

export const empresaSchema = z.object({
  // Empresa
  razon_social: z.string().min(2, "La razón social es obligatoria"),

  cuit: z
    .string()
    .min(11, "El CUIT debe tener 11 dígitos")
    .max(11, "El CUIT debe tener 11 dígitos"),

  email: z.string().email("Email inválido"),

  telefono: z.string().optional(),

  direccion: z.string().optional(),

  // Administrador
  nombre: z.string().min(2, "El nombre es obligatorio"),

  apellido: z.string().min(2, "El apellido es obligatorio"),

  usuario_email: z.string().email("Email de acceso inválido"),

  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type EmpresaFormValues = z.infer<typeof empresaSchema>;