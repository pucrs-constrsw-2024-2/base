package Group7.OAuth.adapter.keycloak;

import java.util.UUID;
import java.util.Collection;

public interface KeycloakAdapter {

    KeycloakToken authenticateUser(String username, String password);

    KeycloakUser createUser(String authorizationHeader, KeycloakUserRegistration user);
    KeycloakUser createUser(KeycloakUserRegistration user);

    KeycloakUser getUserById(String token, UUID id);

    Collection<KeycloakUser> getUsers(String token);
}
