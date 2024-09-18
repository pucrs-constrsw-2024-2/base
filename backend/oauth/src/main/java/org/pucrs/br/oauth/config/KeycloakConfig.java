package org.pucrs.br.oauth.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class KeycloakConfig {

    @Value("${KEYCLOAK_INTERNAL_HOST}")
    private String keycloakHost;

    @Value("${KEYCLOAK_INTERNAL_PORT}")
    private String keycloakPort;

    @Value("${KEYCLOAK_REALM}")
    private String keycloakRealm;

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
}
