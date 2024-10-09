package Group7.OAuth.adapter.keycloak;

import Group7.OAuth.application.dtos.RoleDTO;

import java.util.Collection;
import java.util.UUID;

public interface KeycloakAdapter {

    KeycloakToken authenticateUser(String username, String password);

    KeycloakToken refreshToken(String refreshToken);

    KeycloakUser createUser(String authorizationHeader, KeycloakUserRegistration user);

    KeycloakUser getUserById(String token, UUID id);

    Collection<KeycloakUser> getUsers(String token);

    KeycloakUser updateUser(String token, UUID id, KeycloakUserRegistration keycloakUserRegistration);

    void changePassword(String token, UUID userId, KeycloackCredential keycloackCredential);

    void deleteUser(String token, UUID id);

    void addRoleToUser(String token, UUID userId, KeycloakRole role);
    void deleteUserGroup(String token, UUID userId, String group);

    Collection<RoleDTO> getRoles(String token);

    Collection<RoleDTO> getUserGroups(String token, UUID userId);
}
