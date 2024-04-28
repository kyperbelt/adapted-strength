#!/bin/sh

# Read in the file of environment settings.
set -a
source /app/.env
set +a
# cat /app/.env
# DEBUG -TODO REMOVE
printenv
# Then run the CMD
exec "$@"
