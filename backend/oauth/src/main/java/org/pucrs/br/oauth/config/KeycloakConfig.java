package org.pucrs.br.oauth.config;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestTemplate;

@Configuration
public class KeycloakConfig {

    @Value("${KEYCLOAK_INTERNAL_HOST}")
    private String keycloakHost;

    @Value("${KEYCLOAK_INTERNAL_PORT}")
    private String keycloakPort;

    @Value("${KEYCLOAK_REALM}")
    private String keycloakRealm;

    @Value("${KEYCLOAK_CLIENT_ID}")
    private String clientId;

    @Value("${KEYCLOAK_CLIENT_SECRET}")
    private String clientSecret;

    @Value("${keycloak.username}")
    private String username;

    @Value("${KEYCLOAK_ADMIN_PASSWORD}")
    private String password;

    @Bean("keycloakRestClient")
    public RestClient keycloakRestClient() {
        var baseUrl = String.format(
                "http://%s:%s/realms/%s",
                keycloakHost,
                keycloakPort,
                keycloakRealm);

        return RestClient.builder()
                .baseUrl(baseUrl)
                .build();
    }

    public String getKeycloakRealm() {
        return keycloakRealm; // Getter para o keycloakRealm
    }

    public RestClient getKeycloakRestClient() {
        return keycloakRestClient();
    }

    public String getAdminAccessToken() {
        RestTemplate restTemplate = new RestTemplate();

        var response = restTemplate.postForEntity(
            String.format("http://%s:%s/realms/%s/protocol/openid-connect/token",
                          keycloakHost, keycloakPort, keycloakRealm),
            new HttpEntity<>(Map.of(
                "client_id", clientId,
                "client_secret", clientSecret,
                "username", username,
                "password", password,
                "grant_type", "password"), 
                new HttpHeaders() {{
                    setContentType(MediaType.APPLICATION_FORM_URLENCODED);
                }}),
            Map.class
        );

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            return (String) response.getBody().get("access_token");
        } else {
            throw new RuntimeException("Failed to obtain access token from Keycloak");
        }
    }
}
