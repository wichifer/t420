#!/bin/sh

set -e

echo "======================================"
echo "   ERP/POS SaaS T420"
echo "   Backend Startup"
echo "======================================"

echo "Esperando PostgreSQL..."

until pg_isready \
    -h postgres \
    -U "$POSTGRES_USER" \
    -d "$POSTGRES_DB"
do
    sleep 2
done

echo "PostgreSQL disponible."

echo "Aplicando migraciones..."

npx prisma migrate deploy

echo "Iniciando NestJS..."

exec node dist/main.js