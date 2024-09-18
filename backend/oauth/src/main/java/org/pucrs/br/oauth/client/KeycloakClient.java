package org.pucrs.br.oauth.client;

import java.util.Map;

import org.pucrs.br.oauth.model.Auth;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class KeycloakClient {
    @Value("${KEYCLOAK_INTERNAL_HOST}")
    private String keycloakHost;

    @Value("${KEYCLOAK_INTERNAL_PORT}")
    private String keycloakPort;

    @Value("${KEYCLOAK_REALM}")
    private String keycloakRealm;

    @Value("${KEYCLOAK_CLIENT_ID}")
    private String keycloakClientId;

    private final RestClient client;

    KeycloakClient(RestClient client) {
        var baseUrl = String.format(
                "http://%s:%s/realms/%s",
                keycloakHost,
                keycloakPort,
                keycloakRealm);

        this.client = RestClient.builder()
                .baseUrl(baseUrl)
                .build();
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
