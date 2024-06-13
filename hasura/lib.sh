#! /bin/bash

generate_keys()
{
    [ ! -f "$HOME_DIR/jwtRS256.key.pub" ] && source $HOME_DIR/jwt-key-generation.sh
    [ ! -f "$HOME_DIR/jwtRS256.key.pub" ] && log.error "JWT key generation has failed."
    public_key=$(awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}'  jwtRS256.key.pub)
    echo "$public_key"
}

load()
{
    HOME_DIR=$(pwd)
    SCRIPT_DIR=$(dirname $0)

    ENV_EXAMPLE_FILENAME="$HOME_DIR/.env.example"
    ENV_FILENAME="$HOME_DIR/.env"

    if [ ! -f "$ENV_FILENAME" ]; then
        cp $ENV_EXAMPLE_FILENAME $ENV_FILENAME
        if (( $? == 0 )); then
            log.info "File '.env' has copied from '.env.example'."
        fi
    fi

    line='<RSA_PUBLIC_KEY_MINIMUM_2048_BITS>'
    if grep -q "$line" "$ENV_FILENAME"; then
        public_key=$(generate_keys)
        sed -i '' "s/${line}/$(echo $public_key | sed 's/[&/\]/\\&/g')/g" "$HOME_DIR/.env"
        if (( $? == 0 )); then
            log.info "A public key to be written inside '.env' file has been temporarily added (See JWT key files generated)."
        fi
    fi

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