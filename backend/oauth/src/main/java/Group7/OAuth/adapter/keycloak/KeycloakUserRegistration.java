package Group7.OAuth.adapter.keycloak;

import java.util.Collection;

public record KeycloakUserRegistration(
        String email,
        String username,
        String firstName,
        String lastName,
        Boolean enabled,
        Collection<KeycloackCredential> credentials
) {
}
