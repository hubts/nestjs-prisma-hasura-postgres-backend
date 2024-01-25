# Hasura

**Hasura** is a database manager with the powerful features, such as instant GraphQL API, webhook trigger, serverless function, and so on.

# Setting

See and fill '.env' file.

-   `CONTAINER_NAME` : name of container, no change recommended
-   `HASURA_PORT` : port number of external port
-   `HASURA_ADMIN_SECRET` : secret to connect to hasura with console/browser
-   `HASURA_GRAPHQL_DATABASE_URL` : database connection url (postgres://username:password@host:port/dbname)

On the other hand, the configurations for hasura CLI are in 'config.yaml'. If you want to disable console to use CLI, change `HASURA_GRAPHQL_ENABLE_CONSOLE` as 'false' in 'docker-compose.yaml'. Then, use this command to run the console of hasura:

```Bash
$ hasura console
```

# Run

If you want to export/apply metadata only, the running of script is not necessary. Move on to [here](#additional-scripts).

```Bash
$ ./run.sh
```

Hasura container would be started.

# Description

You can see the documentation of hasura in [official](https://hasura.io/docs/latest/index/).

After starting, enter [localhost:8080](http://localhost:8080) in your browser to see hasura if port is 8080. If the hasura does not connect to a database automatically, you can connect to a database via console (See [documentation](https://hasura.io/docs/latest/databases/connect-db/index/)).

When you want to handle the metadata of hasura or reflect changes to metadata in a file in real time using console, you should use 'Hasura CLI'. You can install the CLI using this command from [hasura-docs](https://hasura.io/docs/latest/hasura-cli/install-hasura-cli/):

```Bash
$ curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash
$ hasura version
```

If there is the newest version, version check recommends a new version. You can update CLI using this command:

```Bash
$ hasura update-cli
```

Now, you can initialize hasura-cli that can be started to perform/manage metadata and migrations. This below command generates directories, 'metadata', 'migrations', and 'seeds'.

```Bash
$ hasura init . # in this directory
```

You can also initialize hasura as a new project with a new directory using just command 'hasura init'.

The console can export or apply the metadata manually using the implemented scripts. In '/metadata' directory, exported metadata are saved. Especially,

-   `/metadata/databases` : handle the database schema, table, and so on.
-   `/metadata/databases/databases.yaml` : save the database connection configuration.
-   `/metadata/actions.graphql` : save the type of actions (input/output).
-   `/metadata/actions.yaml` : save the detail of actions.

On the other hand, you can use Metadata APIs to handler metadata via API. Some of scripts described in next [section](#additional-scripts) are implemented with the API. See [documentation](https://hasura.io/docs/latest/api-reference/metadata-api/index/) to know more.

# Additional Scripts

### `connect-database.sh`

Run to connect to 'postgres' using CURL command.

Ensure that the environment variable, `HASURA_GRAPHQL_DATABASE_URL` was set.

**Usage**

```Bash
$ ./script/connect-database.sh http://localhost:8080 qwerqwerqwer default
```

### `metadata-export.sh`

Run to export the metadata in endpoint to local directories.

**Usage**

```Bash
$ ./script/metadata-export.sh http://localhost:8080 qwerqwerqwer
```

### `metadata-apply.sh`

Run to apply the metadata in local directories to endpoint.

**Usage**

```Bash
$ ./script/metadata-apply.sh http://localhost:8080 qwerqwerqwer
```

### `create-event.sh`

Run to create(register) a new event trigger.

**Usage**

```Bash
$ ./script/create-event.sh http://localhost:8080 qwerqwerqwer default public user user_handler http://127.0.0.1/webhook-api
```

Note that event trigger cannot handle 'localhost' as host, you should use domain or IP address as host. In fact, this script was implemented to register event triggers to handle blockchain actions filled by 'fill-pg'. The script command registering an event trigger to handler the actions will be in the following:

```Bash
$ ./script/create-event.sh http://localhost:8080 qwerqwerqwer default chain action_trace trace_handler http://127.0.0.1/webhook-api
```
