package Group7.OAuth.application.usecase;

import Group7.OAuth.adapter.keycloak.KeycloakAdapter;
import Group7.OAuth.application.dtos.RoleDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.UUID;

@RequiredArgsConstructor
@Component
public class GetUserGroupsUC {

    private final KeycloakAdapter keycloakAdapter;

    public Collection<RoleDTO> run(String token, UUID userId) {
        return keycloakAdapter.getUserGroups(token, userId);
    }
}
