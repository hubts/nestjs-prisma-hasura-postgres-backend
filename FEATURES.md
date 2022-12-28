# Features

-   Set-up Configurations
-   TypeORM with Postgres
-   Throttler
-   Example Module
    -   User
        -   Create
        -   Update
        -   Delete
        -   FindAll
        -   FindOneById
    -   HealthCheck
-   Morgan: HTTP Request Logger Middleware

# Logs

-   2022-12-25 (🙏 Merry Christmas!)

    -   Project is newly started!
    -   TypeORM module has been imported. We use 'Postgres' for database.
    -   Configurations are added. APP and TypeORM configs were the first.

-   2022-12-26

    -   Throttler module has been imported. The configuration of it is optional.
    -   Cache module has been imported. It is just in-memory cache.
    -   User module has been added.
        -   User controller, service, and entity with dto are implemented.
        -   Default DTO for User is implemented as domain (exactly same with user entity), other DTOs are implemented in 'dto' dir.
    -   Shared directory has been implemented.
        -   Enums & Models: base DTO, entity, interface for each model (can be used to implement domain easily) are implemented.
        -   Util: random generator, hash crypt (for password) have been implemented.
    -   Package 'morgan' has been imported to see http request in log.

-   2022-12-28
    -   HealthCheck
        -   Http and database checks are implemented.
    -   Decorator
    -   Error/HttpExceptionFilter is used to handler errors.
