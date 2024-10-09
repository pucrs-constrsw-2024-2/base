package Group7.OAuth.adapter.keycloak;

import java.util.UUID;

public record KeycloakRole (
        UUID id,
        Boolean clientRole
) {
}