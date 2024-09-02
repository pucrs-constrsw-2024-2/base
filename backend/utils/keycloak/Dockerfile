FROM redhat/ubi9:9.3 AS ubi9

RUN dnf install --installroot /mnt/rootfs curl --releasever 9 --setopt install_weak_deps=false --nodocs -y; dnf --installroot /mnt/rootfs clean all

FROM quay.io/keycloak/keycloak:24.0

COPY --from=ubi9 /mnt/rootfs /