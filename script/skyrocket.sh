#!/bin/bash

# Go to root directory
SCRIPT_DIR=$(dirname $0)
[[ "$SCRIPT_DIR" = "." ]] && SCRIPT_DIR=$(pwd)
ROOT_DIR=$(dirname $SCRIPT_DIR)
cd $ROOT_DIR

# Usage
usage() {
    echo "Usage: $0 [<new_version> | major | minor | patch | premajor | preminor | prepatch | prerelease]"
    exit 1
}

main() {
    [ "$1" == "" ] && usage

    branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
    echo "🎄 Your branch is [ $branch ]"

    request="$1"
    previous_version=$(node -p "require('$ROOT_DIR/package.json').version")
    new_version=$(npm version $request --no-git-tag-version)
    echo "🛫 Try to update [ $previous_version ] -> [ $new_version ]"

    if (( $? == 0 )); then
        version=${new_version:1}
        search='("version":[[:space:]]*").+(")'
        replace="\1${version}\2"
        sed -i ".tmp" -E "s/${search}/${replace}/g" "package.json"
        rm "package.json.tmp"

        read -p "❓ Enter a new commit message: " message
        git add .
        git commit -m "[$version] $message"

        echo "🥰 Successfully updated and committed to [ $new_version ]"
    else
        echo "😥 Failed"
    fi
}

main "$1"