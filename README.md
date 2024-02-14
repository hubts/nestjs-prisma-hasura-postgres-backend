<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# NestJS Easyfull Boilerplate for Backend

## Easyfull Boilerplate

This repository presents a backend boilerplate based on [NestJS](https://github.com/nestjs/nest) and [Hasura](https://hasura.io) with some [features](#features).

Of course there are many templates you can use, but this boilerplate allows beginners to construct the backend without difficult skills. Thus, it may not have the highest level of skills, but it may be an easier way to experience.

_You can start, implement, and deploy your backend server easily with this boilerplate._

## NestJS + Hasura + Postgres = Backend

Even if you are new to the backend, you may know that the backend starts with a system of servers and databases. This repository is aimed at that point.

A basic backend system can be started with NestJS, Hasura, and Postgres. You can enjoy the convenience of sending/receiving data by preparing the Postgres database, implementing the NestJS server, and connecting the Hasura server.

Here are some descriptions for them used in this boilerplate.

### [NestJS](https://github.com/nestjs/nest)

Nest is the TypeScript framework to implement server based on Node.js, and it contains a lot of features, such as OOP (Object Oriented Programming), FP (Functional Programming), and so on.

-   You can use this to handle data (domain) or to implement and execute business logics.

### [Hasura](https://hasura.io)

Hasura is the GraphQL engine with a database management system, which includes functions that perform the tasks the server needs to do instead. In simple way, it is basically similar to a database administrator system, but as a proxy server, it has functions such as Relaying, Batch, and authentication, and of course supports GraphQL functionality for databases.

-   You can use this to manage/monitor databases, authenticate, and reduce the workload of the server implementation.

### [Postgres](https://www.postgresql.org/)

Postgres is an open-source relational database system (In fact, you can use another database system such like MySQL for your purposes).

However, this has affinity with NestJS and Hasura, and is an advanced database system that is highly recommended because it has many advantages, including ACID compatibility, JSON and JSONB type support, and support for various advanced functions.

-   You can use this as a database. That is all.

# Goals

## Not RESTful, but Hasura-ful

This boilerplate aims to:

-   **Productivity** : Start new projects quickly and configure your environment
-   **Education** : Adaption of NestJS and Hasura usage
-   **Utilization** : Testing for new code or library easily

In this version, we are most focused on **productivity**.

> _In various backend architectures, DDD (Domain-driven design) or micro-service nature may be more useful. However, we aimed to incorporate the advantages of Hasura into NestJS. Therefore, we tried to increase the productivity of the backend by focusing on implementing Action Handler (Hasura feature) in NestJS._

# Summary

| Key Point       | Use / Implementation / Connection |
| --------------- | --------------------------------- |
| Framework       | NestJS                            |
| Language        | TypeScript                        |
| Package Manager | yarn                              |
| Architecture    | Monolith, CQRS                    |
| Documentation   | Swagger                           |
| Database        | TypeORM & Postgres                |
| DB Admin        | Hasura                            |
| Interaction     | Hasura Query & Actions            |
| Deployment      | Dockerlized                       |

# Features

-   [x] Architecture from CQRS Pattern (focusing on Hasura Action Handler)
-   [x] Focusing on Code Sharing for Collaboration
-   [x] Swagger Documentation
-   [x] Health Checker & Throttler
-   [x] Cache on Database
-   [x] Custom Logging System
-   [x] JWT Authentication
-   [x] User/Auth Examples
-   [x] Docker Versioning and Deployment

# Start

## Prerequisites

The infrastructures, Postgres and Hasura, run on top of docker container by `docker-compose` command in this boilerplate. If you already ran those infrastructures, you do not need to follow this step. However, you should note that Hasura requires JWT settings.

You can install docker as [desktop-app](https://docs.docker.com/get-docker/) or [engine](https://docs.docker.com/engine/install/). After installation, `docker-compose` may be installed together. If not, install it using the [command](#docker-compose).

We shares some commands to install `docker-compose`. Note that the below commands are executed in Ubuntu 18.04:

### Ready to install docker

Update apt package index and install packages to use the repository via HTTPs:

```bash
$ sudo apt-get update
$ sudo apt-get install -y ca-certificates curl software-properties-common apt-transport-https gnupg lsb-release
```

Register 'Official GPG Key' of docker, and set up the stable repository:

```bash
$ sudo mkdir -p /etc/apt/keyrings
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
$ echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### Docker

Install docker engine with the latest version:

```bash
$ sudo apt-get update # Essential to install 'docker-ce'
$ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
$ sudo chmod 666 /var/run/docker.sock # If got permission denied to docker daemon socket
```

### Docker-compose

Install docker-compose:

```bash
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose # '1.24.0' can be replaced with a specific version
$ docker-compose version
```

Now check that docker with compose is available:

```bash
$ docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES

$ docker-compose --version
docker-compose version 1.17.1, build unknown
```

## Cloning

```bash
$ git clone https://github.com/hubts/nestjs-easyfull-boilerplate.git
```

## Setting

You should prepare settings to start Postgres, Hasura, and NestJS server. The settings are set in _`.env`_ environment variable files.

### Postgres

Follow this [document](./postgres/README.md) in Postgres directory.

### Hasura

Follow this [document](./hasura/README.md) in Hasura directory.

### NestJS boilerplate

See _`.env.example`_ file in root directory, and copy it as _`.env`_ file to set environment variables.

-   `ENV` : Server environment to handle services (e.g. logging).
-   `PORT` : Server listening port.
-   `EXTERNAL_ENDPOINT` : Server external endpoint used in swagger OpenAPI.
-   `DB_*` : Database settings to connect with the running database.
-   `THROTTLER_*` : Throttler options.
-   `JWT_*` : JWT options.

## Installation

```bash
$ yarn # or 'yarn install'
```

## Run

```bash
# Start
$ yarn start

# Start with watch mode (to debug)
$ yarn start:dev
```

## Deployment

```bash
$ yarn deploy
```
