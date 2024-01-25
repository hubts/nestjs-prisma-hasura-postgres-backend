#! /bin/bash

source lib.sh

usage()
{
    log.info "Usage: $0 [command]"
    log.info "[command] must be a single parameter as a command that contain a semicolon and double quotes."
    log.info "Example: $0 \"SHOW max_connections;\""
    exit 1
}

main()
{
    [[ -z "$1" ]] && usage

    docker exec -it $CONTAINER_NAME psql --username $POSTGRES_USER --dbname $POSTGRES_DB --command "$@"
}

main "$1"