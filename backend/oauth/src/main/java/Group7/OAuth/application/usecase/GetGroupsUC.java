package Group7.OAuth.application.usecase;

import Group7.OAuth.adapter.keycloak.KeycloakAdapter;
import Group7.OAuth.application.dtos.GroupDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Collection;

@RequiredArgsConstructor
@Component
public class GetGroupsUC {

    private final KeycloakAdapter keycloakAdapter;

    public Collection<GroupDTO> run(String token) {
        return keycloakAdapter.getGroups(token);
    }
}
