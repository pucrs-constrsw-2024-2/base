package Group7.OAuth.application.usecase;

import Group7.OAuth.adapter.keycloak.KeycloakAdapter;
import Group7.OAuth.adapter.keycloak.KeycloakMapper;
import Group7.OAuth.application.dtos.UserDTO;
import Group7.OAuth.application.dtos.UserRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class UpdateUserUC {

    private final KeycloakAdapter keycloakAdapter;
    private final KeycloakMapper keycloakMapper;

    public UserDTO run(String token, UUID id, UserRequestDTO user) {
        return keycloakMapper.toUserDTO(keycloakAdapter.updateUser(token, id, keycloakMapper.toKeycloakUserRegistration(user)));
    }
}
