#!/bin/sh

/create-env.sh

# Wait for the database to become available
wait-for-it db-container-chega-facil:4523 -- npx prisma migrate dev

# Start application
npm run start:dev
