# Postgres

_Postgres_ is a relational database management system, open-source project.

# Setting

You can copy _.env.example_ file as _.env_ file to save settings. See and fill the file to set environment variables:

-   `CONTAINER_NAME` : name of container.
-   `POSTGRES_PORT` : port number of external port.
-   `POSTGRES_DB` : database name, 'postgres' default.
-   `POSTGRES_USER` : username, 'postgres' default.
-   `POSTGRES_PASSWORD` : password to connect.
-   `POSTGRES_VOLUME_DIR` : directory name of postgres data volume.

If you want to use the default settings in _.env.example_ file, just run the following step.

# Run

```Bash
$ ./run.sh
```

A postgres container would be started.

If a permission error occurs, use this command:

```Bash
$ chmod +x run.sh # or attach 'sudo' in front.
```

# Description

See _docker-compose.yaml_.

The environment variable `PGDATA` is a directory path to store data inside of a container. Thus, there is no need to change the patch if you do not want to customize.

Two volumes are mounted, and the volumes are used for configuration update and data access. One volume mounts the path `POSTGRES_VOLUME_DIR` you wrote in _.env_ with the above `PGDATA`. The other volume mounts the configuration file named _postgresql.conf_ to copy and link it. When you run the script _run.sh_, configuration for postgres would be set with the file.

If you want to change the configuration only, follow this process:

1. Change the configuration file _postgresql.conf_.
2. Restart docker using the command:

```Bash
$ docker restart $CONTAINER_NAME
```

Do not use _run.sh_ script to change the configuration only, because the script removes the existing container. The change of configuration just requires restarting.

# Additional Scripts

## _psql.sh_

Run a `psql` command to use postgres SQL in a container.

**Usage**

```Bash
$ ./script/psql.sh "SHOW max_connections;"
 max_connections
-----------------
 500
(1 row)

```

## _psql-access.sh_

Run to access 'psql' command-line inside a container.

**Usage**

```Bash
$ ./script/psql-access.sh
psql (13.7 (Debian 13.7-1.pgdg110+1))
Type "help" for help.

postgres=#
```
