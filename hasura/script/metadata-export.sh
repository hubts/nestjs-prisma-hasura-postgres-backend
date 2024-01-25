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

    log.info "Try to export hasura metadata from $endpoint"
    log.warn "Your directory '/metadata' will be overwritten."

    read -p "Proceed(Y/n)? " answer
    if [[ $answer == "Y" || $answer == "y" ]]; then
        hasura metadata reload --endpoint $endpoint --admin-secret $secret
        hasura metadata export --endpoint $endpoint --admin-secret $secret

        if (( $? == 0 )); then
            log.done "Metadata exported from $endpoint"
        else
            log.error "Exporting failed."
        fi
    fi
}

main $@