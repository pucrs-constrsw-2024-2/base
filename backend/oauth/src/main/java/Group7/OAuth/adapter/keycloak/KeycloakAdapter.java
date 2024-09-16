package Group7.OAuth.adapter.keycloak;

public interface KeycloakAdapter {

    KeycloakToken authenticateUser(String username, String password);

    KeycloakUser createUser(String authorizationHeader, KeycloakUserRegistration user);
}
