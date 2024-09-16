package Group7.OAuth.application.usecase;

import Group7.OAuth.adapter.keycloak.KeycloakAdapter;
import Group7.OAuth.adapter.keycloak.KeycloakMapper;
import Group7.OAuth.application.dtos.UserDTO;
import Group7.OAuth.application.dtos.UserRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class CreateUserUC {

    private final KeycloakAdapter keycloakAdapter;

    private final KeycloakMapper keycloakMapper;

    public UserDTO run(UserRequestDTO user) {
        return keycloakMapper.toUserDTO(keycloakAdapter.createUser(keycloakMapper.toKeycloakUserRegistration(user)));
    }
}


