
package org.pucrs.br.oauth.service;

import lombok.RequiredArgsConstructor;
import org.pucrs.br.oauth.client.KeycloakClient;
import org.pucrs.br.oauth.dto.response.keycloak.TokenResponse;
import org.pucrs.br.oauth.dto.response.AuthResponse;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final KeycloakClient keycloakClient;

    @Override
    public AuthResponse authenticate(String username, String password) {
        TokenResponse keycloakAuthData = keycloakClient.generateAccessToken(username, password);
        return AuthResponse.builder()
                .accessToken(keycloakAuthData.getAccessToken())
                .refreshToken(keycloakAuthData.getRefreshToken())
                .expiresIn(keycloakAuthData.getExpiresIn())
                .refreshExpiresIn(keycloakAuthData.getRefreshExpiresIn())
                .tokenType(keycloakAuthData.getTokenType())
                .build();
    }
}
