#! /bin/bash

source lib.sh

usage()
{
    log.info "Usage: $0 [endpoint] [admin_secret] [data_source] [schema_name] [table_name] [event_name] [webhook_endpoint]"
    log.info "Example: $0 http://localhost:8080 qwerqwerqwer action_event default public user http://127.0.0.1:8000/api/user/event_handler"
    exit 1
}

main()
{
    (( $# != 7 )) && usage

    endpoint=$1
    secret=$2
    database=$3
    schema=$4
    table=$5
    event_name=$6
    webhook=$7

    # Setting data json
    # If you do not want to trigger 'update' event, delete the json part named 'update'.
    data=$(cat << EOF
        {
            "type": "pg_create_event_trigger",
            "args": {
                "name": "$event_name",
                "source": "$database",
                "table": {
                    "name": "$table",
                    "schema": "$schema"
                },
                "webhook": "$webhook",
                "insert": {
                    "columns": "*"
                },
                "update": {
                    "columns": "*"
                }
            }
        }
EOF
)

    curl -X POST "$endpoint/v1/metadata" \
        -d "$data" \
        -H "Content-Type: application/json" \
        -H "X-Hasura-Role: admin" \
        -H "X-Hasura-Admin-Secret: $secret" | json_pp
}

main "$@"