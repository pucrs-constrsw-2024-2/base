package org.pucrs.br.oauth.client;

import org.pucrs.br.oauth.model.Auth;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Component
public class KeycloakClient {

    private final String keycloakClientId;
    private final RestClient client;

    public KeycloakClient(@Value("${KEYCLOAK_CLIENT_ID}") String keycloakClientId,
                          @Qualifier("keycloakRestClient") RestClient client) {
        this.keycloakClientId = keycloakClientId;
        this.client = client;
    }

    public ResponseEntity<Auth> auth(String username, String password) {
        var formData = Map.of(
                "grant_type", "password",
                "client_id", keycloakClientId,
                "username", username,
                "password", password);

        return client.post()
                .uri("/protocol/openid-connect/token")
                .headers(
                        headers -> headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED))
                .body(formData)
                .retrieve()
                .toEntity(Auth.class);
    }
}
