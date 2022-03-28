#!/bin/bash
CONTAINER_NAME="movesense-postgres"
DATABASE_USER="dev"

echo "Initializing local DB"

if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    if [ "$(docker ps -aq -f status=running -f name=$CONTAINER_NAME)" ]; then
        echo "Stopping existant container"
        docker stop $CONTAINER_NAME 
    fi
    echo "Removing existant container"
    docker rm $CONTAINER_NAME
fi

echo  "Bringing up a new DB container"
docker run --name $CONTAINER_NAME -e POSTGRES_USER=$DATABASE_USER -e POSTGRES_PASSWORD=$DATABASE_USER -p 5432:5432 -d postgres:14.2-alpine
sleep 5
db-migrate up --config config/database.json -e dev
echo "Exiting..."