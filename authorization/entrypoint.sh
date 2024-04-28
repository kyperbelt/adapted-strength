#!/bin/sh

# Read in the file of environment settings.
source .env
# Then run the CMD
exec "$@"
