package Group7.OAuth.adapter.keycloak;

import java.util.UUID;
import java.util.Collection;

public interface KeycloakAdapter {

    KeycloakToken authenticateUser(String username, String password);

    KeycloakToken refreshToken(String refreshToken);

    KeycloakUser createUser(String authorizationHeader, KeycloakUserRegistration user);

    KeycloakUser getUserById(String token, UUID id);

    Collection<KeycloakUser> getUsers(String token);

    KeycloakUser updateUser(String token, UUID id, KeycloakUserRegistration keycloakUserRegistration);

    void changePassword(String token, UUID userId, KeycloackCredential keycloackCredential);

    void deleteUser(String token, UUID id);
}
