#!/bin/sh
wait-for-it db-container-chega-facil:5432 --timeout=30 -- echo "Database done."

npx prisma migrate dev --name "initial_migration"
npx prisma generate

# Start application
npm run start:dev
