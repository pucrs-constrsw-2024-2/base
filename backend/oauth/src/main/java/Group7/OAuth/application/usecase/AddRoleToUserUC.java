package Group7.OAuth.application.usecase;

import Group7.OAuth.adapter.keycloak.KeycloakAdapter;
import Group7.OAuth.adapter.keycloak.KeycloakRole;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@RequiredArgsConstructor
@Component
public class AddRoleToUserUC {

    private final KeycloakAdapter keycloakAdapter;

    public void run(String token, UUID userId, UUID roleID) {
        KeycloakRole role = new KeycloakRole(roleID, false);
        keycloakAdapter.addRoleToUser(token, userId, role);
    }
}
