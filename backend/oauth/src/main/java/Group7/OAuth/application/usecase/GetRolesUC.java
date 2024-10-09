package Group7.OAuth.application.usecase;

import Group7.OAuth.adapter.keycloak.KeycloakAdapter;
import Group7.OAuth.application.dtos.RoleDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Collection;

@RequiredArgsConstructor
@Component
public class GetRolesUC {

    private final KeycloakAdapter keycloakAdapter;

    public Collection<RoleDTO> run(String token) {
        return keycloakAdapter.getRoles(token);
    }
}
