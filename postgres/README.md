# Postgres

## What is this?

Postgres is a relational database management system, open-source project.

You can see the documentation of Postgres in [official](https://www.postgresql.org/docs/).

## Setting

### Prerequisites

#### Docker compose

Postgres will run on docker container by our run script. In detail, `docker-compose` command will be used. Please check you can use `docker-command` command by the script.

### Set environment variables

If you are starting without any settings, our run script will copy _.env.example_ file to _.env_ file, and the docker container will be started with the basic environment variables.

To set your variables, copy _.env.example_ file to _.env_ file, and fill it.

| Key                   | Description                                          |
| --------------------- | ---------------------------------------------------- |
| `CONTAINER_NAME`      | Name of running docker container                     |
| `POSTGRES_PORT`       | Port number outside docker container (default: 8080) |
| `POSTGRES_DB`         | Database name (default: postgres)                    |
| `POSTGRES_USER`       | Database username (default: postgres)                |
| `POSTGRES_PASSWORD`   | Database password to connect                         |
| `POSTGRES_VOLUME_DIR` | Directory name of Postgres data volume               |

### Set docker-compose

See _docker-compose.yaml_ file. The file contains the image version of Postgres from docker-hub, and some settings with environment variables. You can check the settings by looking at the names that match the environment variables.

In `environment` part, `PGDATA` is a directory path to store data inside of the running container.

In `volumes` part, you can see two volumes are created and mounted. The volumes are used for configuration update and data access. One volume mounts the path you wrote to set with the above `PGDATA`. The other volume mounts the configuration file named _postgresql.conf_ to copy and link it. When you run the script _run.sh_, configuration for Postgres will be set by this file.

If you want to change the configuration only, follow this process:

1. Change the configuration file _postgresql.conf_.
2. Restart docker using this command:

```Bash
$ docker restart $CONTAINER_NAME
```

Do not use _run.sh_ script to change the configuration only, because the script removes the existing container. The change of configuration just requires restarting.

## Run

```Bash
$ ./run.sh
```

Postgres container would be started.

If a permission error occurs, use this command:

```Bash
$ chmod +x run.sh # or attach 'sudo' in front.
```

## Additional Scripts

### _psql.sh_

Run a `psql` command to use postgres SQL in a container.

#### Usage

```Bash
$ ./script/psql.sh "SHOW max_connections;"
 max_connections
-----------------
 500
(1 row)

```

### _psql-access.sh_

Run to access 'psql' command-line inside a container.

#### Usage

```Bash
$ ./script/psql-access.sh
psql (13.7 (Debian 13.7-1.pgdg110+1))
Type "help" for help.

postgres=#
```
