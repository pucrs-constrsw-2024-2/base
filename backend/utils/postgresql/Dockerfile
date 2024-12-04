FROM postgres:17-alpine

ARG POSTGRES_HOST_AUTH_METHOD=${POSTGRESQL_HOST_AUTH_METHOD}
ARG PGDATA=${POSTGRESQL_DATA}

ENV PGUSER=${POSTGRESQL_USERNAME}
ENV POSTGRES_USER=${POSTGRESQL_USERNAME}
ENV POSTGRES_PASSWORD=${POSTGRESQL_PASSWORD}

WORKDIR /docker-entrypoint-initdb.d/

# Scripts para criar os databases das APIs de backend
COPY databases.sql /docker-entrypoint-initdb.d/
# USER postgres
# CMD [ "psql",  "--file=databases.sql" ]
