#! /bin/bash

source lib.sh

usage()
{
    log.info "Usage: $0 [endpoint] [admin_secret] [database_display_name]"
    log.info "Example: $0 http://localhost:8080 qwerqwerqwer default"
    exit 1
}

main()
{
    (( $# != 3 )) && usage
    
    log.info "Trying to connect to database via URL from env."
    log.info "\$HASURA_GRAPHQL_DATABASE_URL=$HASURA_GRAPHQL_DATABASE_URL"
    read -p "Proceed(Y/n)? " answer

    if [[ $answer == "Y" || $answer == "y" ]]; then
        # Setting data json
        data=$(cat << EOF
            {
                "type": "pg_add_source",
                "args": {
                    "name": "$3",
                    "configuration": {
                        "connection_info": {
                            "database_url": {
                                "from_env": "HASURA_GRAPHQL_DATABASE_URL"
                            },
                            "pool_settings": {
                                "retries": 1,
                                "idle_timeout": 180,
                                "max_connections": 50
                            }
                        }
                    }
                }
            }
EOF
)

        endpoint=$1
        secret=$2

        curl -X POST "$endpoint/v1/metadata" \
            -d "$data" \
            -H "Content-Type: application/json" \
            -H "X-Hasura-Role: admin" \
            -H "X-Hasura-Admin-Secret: $secret" | json_pp
    fi
}

main "$@"