#!/bin/sh
wait-for-it db-container-chega-facil:5432 --timeout=30 -- echo "Database done."

# Scripts paths
BUILD_CONTAINER_FIRST_SCRIPT="/app/api/build-container-first.sh"
BUILD_CONTAINER_SCRIPT="/app/api/build-container.sh"

# Execute build-container-first.sh
echo "Executando build-container-first.sh..."
sh $BUILD_CONTAINER_FIRST_SCRIPT

# Execute build-container.sh
echo "Executando build-container.sh..."
sh $BUILD_CONTAINER_SCRIPT