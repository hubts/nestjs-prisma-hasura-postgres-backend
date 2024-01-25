#! /bin/bash

source lib.sh

main()
{
    log.info "Try to access to psql. If you want to quit it, use command 'exit'."
    docker exec -it $CONTAINER_NAME psql --username $POSTGRES_USER --dbname $POSTGRES_DB;
}

main