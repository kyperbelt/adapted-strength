#!/bin/bash

# IMPORTANT: DO NOT PUT SENSTIVE INFORMATION IN THIS FILE. THIS IS ONLY MEANT TO WARN YOU WHEN YOU ARE MISSING ENVIRONMENT VARIABLES

## Put all the environment variables that are required for the application to run here in a new line
## This way we can check if they are set, and if they are not, we can exit the script with an error message 
## instead of the vague error message we get from SpringBoot. 
env_vars=(
    "ADAPTED_STRENGTH_EMAIL"
    "ADAPTED_STRENGTH_PASSWORD"
    "ADAPTED_STRENGTH_WEB_URL"
)

error_count=0

for var in ${env_vars[@]}; do
    if [ -z "${!var}" ]; then
        echo "Error: '$var' Environment Variable is not set."
        error_count=$((error_count+1))
    fi
done

if [ $error_count -gt 0 ]; then
    echo "Error: $error_count Environment Variables are not set. Exiting."
    exit 1
fi

