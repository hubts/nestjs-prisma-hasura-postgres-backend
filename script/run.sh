#!/bin/bash

print_branch() {
    git_branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
    if (( $? != 0 )); then
        echo "> 😅 Cannot find git command"
        exit 1
    fi

    echo "> 🌴 Your current branch is [ $git_branch ]"
}

extract_package() {
    APP_NAME=$(node -p "require('$RUN_DIR/package.json').name")
    if (( $? != 0 )); then
        echo "> 😅 Cannot find node command or 'package.json'"
        exit 1
    fi
    APP_VERSION=$(node -p "require('$RUN_DIR/package.json').version")
    IMAGE_FULLNAME="$APP_NAME:$APP_VERSION"
    CONTAINER_NAME="$APP_NAME"
}

build() {
    echo "> 🔎 Try to find [ $IMAGE_FULLNAME ] image"
    existing_image=$(docker images | grep -w "$APP_NAME" | grep -w "$APP_VERSION")
    if [ -z "$existing_image" ]; then
        echo "> 🐳 [ $IMAGE_FULLNAME ] image build started"
        
        docker build --rm -t $IMAGE_FULLNAME $RUN_DIR
        if (( $? != 0 )); then
            echo "> 😅 [ $IMAGE_FULLNAME ] image build failed"
            exit 1
        fi

        echo "> Successfully 🐳 [ $IMAGE_FULLNAME ] image built"
    else
        echo "> 🧐 [ $IMAGE_FULLNAME ] image already exists"
    fi
}

terminate() {
    previous_container=$(docker ps -qa --filter "name=$CONTAINER_NAME" | grep -q . && docker stop $CONTAINER_NAME && docker rm -fv $CONTAINER_NAME)
    [ ! -z "$previous" ] && echo "> 🧹 Previous container cleaned"
}

export_env() {
    ENV_FILENAME="$1"
    [ -z "$ENV_FILENAME" ] && echo "> ✋ Environment filename not given" && exit 1

    ENV_FILE="$RUN_DIR/.env"
    [ ! -f "$ENV_FILE" ] && echo "> 🚫 No such environment file" && exit 1
    
    source $ENV_FILE
}

clean_image() {
    legacy_images=$(docker images --filter "before=$IMAGE_FULLNAME" --filter=reference="$APP_NAME:*" -q)
    if [ ! -z "$legacy_images" ]; then
        docker rmi -f $legacy_images
        if (( $? == 0)); then
            echo "$legacy_images"
            echo "> 🧹 Legacy images cleaned"
        else
            echo "> 😵‍💫 Stop the running container [ $CONTAINER_NAME ] to delete all legacy images"
        fi
    else
        echo "> 🥱 Images before [ $IMAGE_FULLNAME ] have been already cleaned"
    fi
}

# GLOBAL
SCRIPT_DIR=$(dirname $0) # Script was executed by './script/run.sh'
RUN_DIR=$(dirname $SCRIPT_DIR) # Run in root directory with 'package.json'
APP_NAME=""
APP_VERSION=""
IMAGE_FULLNAME=""
CONTAINER_NAME=""
ENV_FILE=""

#########
#  RUN  #
#########
print_branch # (Optional) Print git branch
extract_package # Extract app name and version from package
build # Build docker image
terminate # Terminate the previous container with the same name
export_env ".env" # (Optional) Export environment variables (if you use variables in run command, this is essential)

###############################################
# (Customize) Here is your docker run command #
###############################################

docker run -dit \
    --name=$APP_NAME \
    --env-file $ENV_FILE \
    -p 8000:$PORT \
    $IMAGE_FULLNAME

###############################################
(( $? == 0 )) && echo "> ✨ Successfully started [ $IMAGE_FULLNAME ]"

# (Optional) Clean legacy images
read -p "> 🙋 Do you want to delete legacy images? (y/N): " answer
if [ ! -z $answer ] && ( [ $answer = "Y" ] || [ $answer = "y" ] ); then
    clean_image 
fi

# (Optinal) Prune images
read -p "> 🙋 Do you want to prune images? (y/N): " answer
if [ ! -z $answer ] && ( [ $answer = "Y" ] || [ $answer = "y" ] ); then
    docker image prune -f
    echo "> 🏝️ Dangling images cleaned"
fi