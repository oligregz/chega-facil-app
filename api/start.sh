#!/bin/sh

/create-env.sh

wait-for-it db-container-chega-facil:5432 --timeout=30 -- echo "Banco de dados está pronto."

npx prisma migrate dev --name "initial_migration"
npx prisma generate

# Start application
npm run start:dev
