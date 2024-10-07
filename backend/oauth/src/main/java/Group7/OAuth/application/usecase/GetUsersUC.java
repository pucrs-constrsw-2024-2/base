package Group7.OAuth.application.usecase;

import java.util.Collection;

import org.springframework.stereotype.Component;

import Group7.OAuth.adapter.keycloak.KeycloakAdapter;
import Group7.OAuth.adapter.keycloak.KeycloakMapper;
import Group7.OAuth.adapter.keycloak.KeycloakUser;
import Group7.OAuth.application.dtos.UserDTO;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class GetUsersUC {

    private final KeycloakAdapter keycloakAdapter;

    private final KeycloakMapper keycloakMapper;

    public Collection<UserDTO> run(String token){
        Collection<KeycloakUser> users = keycloakAdapter.getUsers(token);
        return users.stream().map(keycloakMapper::toUserDTO).toList();
    }
}
