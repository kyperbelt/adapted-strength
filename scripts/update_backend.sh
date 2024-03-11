
#!/bin/bash

if [ "$#" -ne 2 ]; then
    echo "Usage: update_backend.sh <jar_name> <backend_url>"
    exit 1
fi

if [ ! -f $1 ]; then
    echo "File not found!"
    exit 1
fi

if [ -z $2 ]; then
    echo "Backend URL is empty!"
    exit 1
fi

JAR_FILE=$1
BACKEND_URL=$2

RESULT=$(scp $JAR_FILE $BACKEND_URL:~/adapteds.jar)

if [ $? -eq 0 ]; then
    echo "File copied successfully!"
else
    echo "File copy failed!"
fi
