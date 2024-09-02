FROM postgres:16-alpine

ARG POSTGRES_DB_NAME courses
ARG POSTGRES_USER ${POSTGRES_USER}
ARG POSTGRES_PASSWORD ${POSTGRES_PASSWORD}
ENV PGDATA /pgdata

WORKDIR /docker-entrypoint-initdb.d/

RUN set -e && \
    nohup bash -c "docker-entrypoint.sh postgres &"
