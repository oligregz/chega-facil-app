#!/bin/sh
wait-for-it db-container-chega-facil:5432 --timeout=30 -- echo "Database done."

# Start application
npm run docker:start
