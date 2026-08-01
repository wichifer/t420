# T420 ERP/POS SaaS

> ERP/POS SaaS moderno desarrollado con React, NestJS, PostgreSQL y Docker.

T420 es una plataforma ERP/POS multiempresa (multi-tenant) diseñada para pequeñas y medianas empresas. Su arquitectura desacoplada permite un despliegue sencillo, escalabilidad y mantenimiento a largo plazo.

---

# Características

- Multiempresa (Multi-Tenant)
- Autenticación JWT
- Administración de Empresas
- Gestión de Usuarios
- Gestión de Clientes
- Gestión de Productos
- Control de Stock
- Órdenes de Compra
- Pagos
- Reportes
- API REST
- Docker Ready

---

# Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Frontend | React + Vite + TypeScript |
| UI | Tailwind CSS + Shadcn UI |
| Backend | NestJS |
| ORM | Prisma |
| Base de Datos | PostgreSQL |
| Proxy | Nginx |
| Contenedores | Docker + Docker Compose |

---

# Arquitectura

```
                 Internet
                     │
                     ▼
                 +---------+
                 |  Nginx  |
                 +---------+
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
+------------------+    +------------------+
| React + Vite     |    | NestJS API       |
| Frontend         |    | Backend          |
+------------------+    +------------------+
                                │
                                ▼
                       +------------------+
                       | PostgreSQL       |
                       | Prisma ORM       |
                       +------------------+
```

---

# Estructura del Proyecto

```
t420/
│
├── backend/
├── frontend/
├── nginx/
├── docs/
│
├── docker-compose.yml
├── .env.example
├── README.md
└── .gitignore
```

---

# Requisitos

- Docker
- Docker Compose

No es necesario instalar Node.js ni PostgreSQL en el servidor.

---

# Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>

cd t420
```

Crear el archivo de variables:

```bash
cp .env.example .env
```

Levantar los contenedores:

```bash
docker compose up --build -d
```

---

# Variables de Entorno

El proyecto utiliza un único archivo `.env`.

Ejemplo:

```env
POSTGRES_DB=t420
POSTGRES_USER=t420
POSTGRES_PASSWORD=change_me

DATABASE_URL=postgresql://t420:change_me@postgres:5432/t420?schema=public

JWT_SECRET=change_this_super_secret_key

PORT=3000

NODE_ENV=production
```

---

# Acceso

## Frontend

```
http://localhost
```

## Backend

```
http://localhost/api
```

## Health Check

```
http://localhost/health
```

---

# Scripts útiles

## Iniciar

```bash
docker compose up -d
```

## Reconstruir

```bash
docker compose up --build
```

## Detener

```bash
docker compose down
```

## Ver logs

```bash
docker compose logs -f
```

---

# Roadmap

## Completado

- Autenticación JWT
- Multiempresa
- Clientes
- Productos
- Stock
- Órdenes
- Pagos
- Dockerización
- Deploy local

## En desarrollo

- Panel SaaS
- Dashboard avanzado
- Auditoría
- Backups
- CI/CD
- Despliegue VPS
- HTTPS
- Dominio propio

---

# Estado del Proyecto

🚧 Desarrollo activo.

El proyecto evoluciona mediante sprints incrementales, priorizando calidad, escalabilidad y despliegue en producción.

---

# Documentación

La documentación técnica se irá incorporando en la carpeta:

```
docs/
```

- architecture.md
- api.md
- database.md
- deploy.md
- roadmap.md

---

# Licencia

Pendiente de definir.