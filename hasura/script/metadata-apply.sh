#! /bin/bash

source lib.sh

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

    log.info "Try to apply hasura metadata to $endpoint"
    log.warn "Hasura metadata in $endpoint would be overwritten."

    read -p "Proceed(Y/n)? " answer
    if [[ $answer == "Y" || $answer == "y" ]]; then
        hasura metadata apply --endpoint $endpoint --admin-secret $secret
        hasura metadata reload --endpoint $endpoint --admin-secret $secret
        
        if (( $? == 0 )); then
            log.done "Metadata applied to $endpoint"
        else
            log.error "Applying failed."
        fi
    fi
}

main $@