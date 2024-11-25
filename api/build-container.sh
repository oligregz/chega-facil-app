MIGRATIONS_DIR="api/prisma/migrations"

# Verify is exists migrations directory
if [ -d "$MIGRATIONS_DIR" ]; then
  echo "Migrations directory exists. Running 'npm run docker:start'."
  npm run docker:start
else
  echo "Migrations directory does not exist. Skipping 'npm run docker:start'."
fi