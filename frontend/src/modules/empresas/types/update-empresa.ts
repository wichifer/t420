// src/modules/empresas/types/update-empresa.ts

export interface UpdateEmpresaDto {
  razon_social?: string;
  cuit?: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  estado?: boolean;
}