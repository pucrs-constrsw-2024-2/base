package Group7.OAuth.adapter.keycloak;

import java.util.UUID;

public interface KeycloakAdapter {

    KeycloakToken authenticateUser(String username, String password);

    KeycloakUser createUser(String authorizationHeader, KeycloakUserRegistration user);
    KeycloakUser createUser(KeycloakUserRegistration user);

    KeycloakUser getUserById(String token, UUID id);
}
