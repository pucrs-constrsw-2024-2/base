package Group7.OAuth.application.usecase;

import org.springframework.stereotype.Component;

import Group7.OAuth.adapter.keycloak.KeycloakAdapter;
import Group7.OAuth.adapter.keycloak.KeycloakMapper;
import Group7.OAuth.application.dtos.JwtTokenDTO;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class LoginUC {

    private final KeycloakAdapter keycloakAdapter;

    private final KeycloakMapper keycloakMapper;

    public JwtTokenDTO run(String user, String password) {
        return keycloakMapper.toTokenDTO(keycloakAdapter.authenticateUser(user, password));
    }

}