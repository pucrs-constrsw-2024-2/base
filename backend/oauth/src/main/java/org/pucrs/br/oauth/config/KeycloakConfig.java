package org.pucrs.br.oauth.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Getter
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

    @Bean("keycloakBaseUrl")
    public String keycloakBaseUrl() {
        return String.format("http://%s:%s", keycloakHost, keycloakPort);
    }
}
