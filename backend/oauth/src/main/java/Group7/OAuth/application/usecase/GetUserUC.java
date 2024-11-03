package Group7.OAuth.application.usecase;

import java.util.UUID;

import org.springframework.stereotype.Component;

import Group7.OAuth.adapter.keycloak.KeycloakAdapter;
import Group7.OAuth.adapter.keycloak.KeycloakMapper;
import Group7.OAuth.adapter.keycloak.KeycloakUser;
import Group7.OAuth.application.dtos.UserDTO;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class GetUserUC {

    private final KeycloakAdapter keycloakAdapter;

    private final KeycloakMapper keycloakMapper;

    public UserDTO run(String token, UUID id){
        KeycloakUser user = keycloakAdapter.getUserById(token, id);
        return keycloakMapper.toUserDTO(user);
    }

}
