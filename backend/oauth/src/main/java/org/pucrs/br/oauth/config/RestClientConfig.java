package org.pucrs.br.oauth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class RestClientConfig {

    @Bean("keycloakRestClient")
    public RestClient keycloakRestClient(String keycloakBaseUrl) {
        return RestClient.builder()
                .baseUrl(keycloakBaseUrl)
                .build();
    }
}
