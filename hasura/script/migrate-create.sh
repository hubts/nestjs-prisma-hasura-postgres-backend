#! /bin/bash

source common.sh

usage()
{
    log.info "Usage: $0 [endpoint] [admin_secret] [schema]"
    log.info "Example: $0 http://localhost:8080 qwerqwerqwer"
    exit 1
}

main()
{
    (( $# != 3 )) && usage

    endpoint=$1
    secret=$2
    schema=$3

    log.info "Try to create new migrations from hasura server."

    hasura migrate create init --from-server --endpoint "$1" --admin-secret "$2" --schema "$3"
    if (( $? == 0)); then
        log.done "New migrations created."
    else
        log.error "Creation failed."
    fi
}

main $@