#! /bin/bash

load()
{
    HOME_DIR=$(pwd)
    SCRIPT_DIR=$(dirname $0)
    [ ! -f "$HOME_DIR/.env" ] && cp $HOME_DIR/.env.example $HOME_DIR/.env
    source $HOME_DIR/.env
}

log.error() 
{ 
    echo -e "$(date +'%F %T') [\033[31mERRO\033[0m]" $@
    exit 1
}

log.done() 
{ 
    echo -e "$(date +'%F %T') [\033[32mDONE\033[0m]" $@ 
}

log.warn() 
{ 
    echo -e "$(date +'%F %T') [\033[33mWARN\033[0m]" $@ 
}

log.info() 
{ 
    echo -e "$(date +'%F %T') [\033[34mINFO\033[0m]" $@ 
}

load