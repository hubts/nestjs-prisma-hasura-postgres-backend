#! /bin/bash

source lib.sh

main()
{
    log.info "Container $CONTAINER_NAME starts after clearing the previous."

    docker ps -qa --filter "name=$CONTAINER_NAME" | grep -q . && docker stop $CONTAINER_NAME && docker rm -fv $CONTAINER_NAME
    docker-compose up -d

    if (( $? == 0 )); then
        log.done "Container $CONTAINER_NAME started."
    else
        log.error "Container $CONTAINER_NAME running failed."
    fi
}

main