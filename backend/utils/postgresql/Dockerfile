FROM postgres:17-alpine

ARG POSTGRES_HOST_AUTH_METHOD=${POSTGRESQL_HOST_AUTH_METHOD}
ARG PGDATA=${POSTGRESQL_DATA}

WORKDIR /docker-entrypoint-initdb.d/

RUN set -e && \
    nohup bash -c "docker-entrypoint.sh postgres &"

# Scripts para criar os databases das APIs de backend
# RUN psql --host=postgresql:5432 --username=${POSTGRES_USER} \
#     --command="CREATE ROLE rooms WITH LOGIN a12345678 WITH LOGIN CREATEDB;"

# RUN [psql --host=postgresql:5432 --username=rooms --password a12345678 ]\
#     --command="CREATE DATABASE rooms \
#                 OWNER rooms \
#                 TEMPLATE template0 \
#                 ENCODING 'LATIN1' \
#                 LC_COLLATE 'C' \
#                 LC_CTYPE 'C' \
#                 TABLESPACE pg_default \
#                 CONNECTION LIMIT -1;"
# lessons
# resources
# courses
# reservations
# students
# professors
