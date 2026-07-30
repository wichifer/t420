export interface Empresa {
  id_empresa: number;
  razon_social: string;
  cuit: string;
  email: string;
  telefono?: string;
  direccion?: string;

  estado: boolean;

  created_at?: string;
  updated_at?: string;
}