#!/bin/sh

# Read in the file of environment settings.
source .env
# DEBUG -TODO REMOVE
printenv
# Then run the CMD
exec "$@"
