package Group7.OAuth.application.usecase;

import Group7.OAuth.adapter.keycloak.KeycloakAdapter;
import Group7.OAuth.adapter.keycloak.KeycloakMapper;
import Group7.OAuth.application.dtos.JwtTokenDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class RefreshTokenUC {

        private final KeycloakAdapter keycloakAdapter;
        private final KeycloakMapper keycloakMapper;

        public JwtTokenDTO run(String refreshToken) {
            return keycloakMapper.toTokenDTO(keycloakAdapter.refreshToken(refreshToken));
        }
}
