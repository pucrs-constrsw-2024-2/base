package Group7.OAuth.application.usecase;

import Group7.OAuth.adapter.keycloak.KeycloakAdapter;
import Group7.OAuth.adapter.keycloak.KeycloakMapper;
import Group7.OAuth.adapter.keycloak.KeycloakUser;
import Group7.OAuth.application.dtos.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Objects;

@RequiredArgsConstructor
@Component
public class GetUsersUC {

    private final KeycloakAdapter keycloakAdapter;

    private final KeycloakMapper keycloakMapper;

    public Collection<UserDTO> run(String token, Boolean enabled) {
        Collection<KeycloakUser> users = keycloakAdapter.getUsers(token);
        if (Objects.nonNull(enabled)) {
            return users.stream()
                    .filter(user -> user.enabled() == enabled)
                    .map(keycloakMapper::toUserDTO)
                    .toList();
        }

        return users.stream().map(keycloakMapper::toUserDTO).toList();
    }
}
