#!/bin/sh

# Read in the file of environment settings.
set -a
source /app/.env
set +a
# Then run the CMD
exec "$@"
