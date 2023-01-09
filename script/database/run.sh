#!/bin/bash

docker-compose up -d .

if (( $? == 0 )); then
    echo "Postgres started"
else
    echo "Running postgres failed"
fi