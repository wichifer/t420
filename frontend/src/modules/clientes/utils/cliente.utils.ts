import type { Cliente } from "../types/cliente";


export function getClienteDisplayName(
  cliente: Cliente
): string {

  if (cliente.razon_social?.trim()) {
    return cliente.razon_social.trim();
  }


  const nombre = cliente.nombre?.trim();
  const apellido = cliente.apellido?.trim();


  if (apellido && nombre) {
    return `${apellido}, ${nombre}`;
  }


  return apellido || nombre || "Sin nombre";
}
export function getClienteContacto(
  cliente: Cliente
): string {

  if (cliente.telefono?.trim()) {
    return cliente.telefono.trim();
  }

  if (cliente.email?.trim()) {
    return cliente.email.trim();
  }

  return "-";
}