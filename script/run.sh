#!/bin/bash

SCRIPT_DIR=$(dirname $0)
RUN_DIR=$(dirname $SCRIPT_DIR)

git_branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
echo "Current branch: [ $git_branch ]"

APP_NAME=$(node -p "require('$RUN_DIR/package.json').name")
APP_VERSION=$(node -p "require('$RUN_DIR/package.json').version")
IMAGE_FULLNAME="$APP_NAME:$APP_VERSION"
echo "Try to find [ $IMAGE_FULLNAME ] image"

existing_image=$(docker images | grep $APP_NAME | grep $APP_VERSION)
if [ -z "$existing_image" ]; then
    echo "[ $IMAGE_FULLNAME ] build started"

    docker build -t $IMAGE_FULLNAME $RUN_DIR
    [[ $? != 0 ]] && echo "Build failed" && exit 1
    echo "[ $IMAGE_FULLNAME ] build successfully completed"

    legacy_images=$(docker images --filter "before=$IMAGE_FULLNAME" --filter=reference="$APP_NAME:*" -q)
    if [ ! -z "$legacy_images" ]; then
        docker rmi -f $legacy_images
        if (( $? == 0)); then
            echo "[ $legacy_images ] cleaned"
        else
            echo "Stop the running container to delete all legacy images"
        fi
    else
        echo "No images found to clean"
    fi
fi
echo "Image found (or build finished)"

CONTAINER_NAME="$APP_NAME"
previous=$(docker ps -qa --filter "name=$CONTAINER_NAME" | grep -q . && docker stop $CONTAINER_NAME && docker rm -fv $CONTAINER_NAME)
[ ! -z "$previous" ] && echo "Previous container cleaned"

ENV_FILE="$RUN_DIR/.env"
[ ! -f "$ENV_FILE" ] && echo "No such environment file" && exit 1
source $ENV_FILE

docker run -dit --name=$APP_NAME \
    -p 5050:$PORT \
    --env-file $ENV_FILE \
    $IMAGE_FULLNAME
(( $? == 0 )) && echo "[ $IMAGE_FULLNAME ] started"