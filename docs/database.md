# Base de Datos

Motor:

- PostgreSQL

ORM:

- Prisma

## Características

- Multiempresa
- Relaciones mediante claves foráneas
- Migraciones con Prisma
- Seed para datos de prueba

## Tablas principales

- empresas
- usuarios
- clientes
- articulos
- ordenes_compra
- detalle_orden_compra
- pagos
- stock_movimientos

## Migraciones

```bash
npx prisma migrate dev