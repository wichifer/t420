# C:\dev\t420\backend\Dockerfile
# =====================================================
# Stage 1 - Builder
# Compila la aplicación y genera Prisma Client
# =====================================================
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

# Copiar dependencias (mejora el uso de la caché de Docker)
COPY package*.json ./
COPY prisma ./prisma

# Instalar todas las dependencias (incluye devDependencies)
RUN npm ci

# Copiar el resto del proyecto
COPY . .

RUN npx prisma generate

# Limpiar posibles artefactos incrementales
RUN rm -rf dist tsconfig.build.tsbuildinfo

# Compilar NestJS
RUN npm run build

# =====================================================
# Stage 2 - Production
# Imagen final optimizada para producción
# =====================================================
FROM node:22-alpine AS production

WORKDIR /usr/src/app

ENV NODE_ENV=production

# Instalar cliente PostgreSQL para health checks y entrypoint
RUN apk add --no-cache postgresql-client wget

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar únicamente dependencias de producción
RUN npm ci --omit=dev

# Copiar aplicación compilada
COPY --from=builder --chown=node:node /usr/src/app/dist ./dist

# Copiar Prisma
COPY --from=builder --chown=node:node /usr/src/app/prisma ./prisma

# Copiar Prisma Client generado
COPY --from=builder --chown=node:node /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=node:node /usr/src/app/node_modules/@prisma ./node_modules/@prisma

# Copiar script de inicio
COPY --chown=node:node entrypoint.sh .

# Dar permisos de ejecución
RUN chmod +x ./entrypoint.sh

# Puerto de NestJS
EXPOSE 3000

# Ejecutar como usuario no privilegiado
USER node

# Punto de entrada
ENTRYPOINT ["./entrypoint.sh"]