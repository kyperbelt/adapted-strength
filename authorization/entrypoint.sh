#!/bin/sh

# Read in the file of environment settings.
source /app/.env
# DEBUG -TODO REMOVE
printenv
# Then run the CMD
exec "$@"
