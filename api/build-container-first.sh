MIGRATIONS_DIR="api/prisma/migrations"

# Verify is exists migrations directory
if [ ! -d "$MIGRATIONS_DIR" ]; then
  echo "Migrations directory does not exist. Running 'npm run docker:dev'."
  npm run docker:dev
else
  echo "Migrations directory exists. Skipping 'npm run docker:dev'."
fi