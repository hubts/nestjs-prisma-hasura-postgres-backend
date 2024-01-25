#! /bin/bash

source common.sh

usage()
{
    log.info "Usage: $0 [endpoint] [admin_secret]"
    log.info "Example: $0 http://localhost:8080 qwerqwerqwer"
    exit 1
}

main()
{
    (( $# != 2 )) && usage

    endpoint=$1
    secret=$2
    now=$(date +"%Y-%m-%d-%H%M%S")

    log.info "Try to pg_dump from $endpoint"

    mkdir -p "dumps" && chmod 755 "dumps"
    curl -d '{"opts": ["-a", "-O", "-x", "--inserts", "--exclude-schema=hdb_catalog"], "clean_output": true, "source": "default"}' \
        -H "x-hasura-admin-secret: $secret" \
        "$endpoint/v1alpha1/pg_dump" \
        > "dumps/pgdump-$now.sql"
    
    if (( $? == 0 )); then
        log.done "PG Dumped from $endpoint"
    else
        log.error "PG Dump failed."
    fi
}

main $@