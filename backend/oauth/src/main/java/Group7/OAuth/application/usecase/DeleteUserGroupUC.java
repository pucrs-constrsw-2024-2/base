package Group7.OAuth.application.usecase;

import Group7.OAuth.adapter.keycloak.KeycloakAdapter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@RequiredArgsConstructor
@Component
public class DeleteUserGroupUC {

    private final KeycloakAdapter keycloakAdapter;

    public void run(String token, UUID userId, String groupId) {
        keycloakAdapter.deleteUserGroup(token, userId, groupId);
    }
}
