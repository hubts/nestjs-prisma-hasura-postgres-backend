#!/bin/bash

# Print the usage and exit
usage() {
    echo "Usage: $0 [<new_version> | major | minor | patch | premajor | preminor | prepatch | prerelease] [path:=$(pwd)]"
    exit 1
}

# Print the current branch of git
print_branch() {
    branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
    echo "🎄 Your current branch is [ $branch ]"
}

# Get the current package version
get_version() {
    dir="$1"
    version=$(node -p "require('$dir/package.json').version")
    if (( $? != 0 )); then
        echo "😥 We cannot find your package.json in here: $(pwd)"
        exit 1
    fi
    echo $version
}

# Git commit
commit() {
    dir="$1"
    git add .
    git cz
    if (( $? == 0 )); then
        new_version=$(get_version $dir)
        echo "🥰 [ $new_version ] Successfully updated and committed!"
    else
        echo "😥 Failed to commit."
        exit 1
    fi
}

bump() {
    dir="$1"
    request="$2"
    [ "$request" == "" ] && usage
    
    print_branch

    old_version=$(get_version $dir)
    new_version=$(npm version $request --no-git-tag-version)
    if (( $? != 0 )); then
        new_version="$request"
    fi
    echo "📂 Location: $dir/package.json"
    echo "🛫 We are trying to update the version [ $old_version ] -> [ $new_version ]"

    version=${new_version:1}
    search='(\"version\":[[:space:]]*\").+(\")'
    replace="\1${version}\2"
    sed -n -E "s/${search}/${replace}/g" "package.json"
    if (( $? != 0 )); then
        echo "😥 Failed to update the version"
        exit 1
    fi

    commit $dir
}

################################
## This script runs from here ##
################################

bump "${2:-$(pwd)}" "$1"