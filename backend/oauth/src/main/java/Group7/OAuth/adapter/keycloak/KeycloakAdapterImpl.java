package Group7.OAuth.adapter.keycloak;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class KeycloakAdapterImpl implements KeycloakAdapter {
    private final String realm;

    private final String clientId;

    private final String clientSecret;

    private final WebClient webClient;
    
    public KeycloakAdapterImpl(
            @Value("${keycloak.url}") String url,
            @Value("${keycloak.realm}") String realm,
            @Value("${keycloak.client-id}") String clientId,
            @Value("${keycloak.client-secret}") String clientSecret) {
        this.realm = realm;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.webClient = WebClient.builder()
                .baseUrl(url)
                .build();
    }

    @Override
    public KeycloakToken authenticateUser(String username, String password) {
        return webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/realms/{realm}/protocol/openid-connect/token")
                        .build(realm))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .bodyValue("grant_type=password&client_id=" + clientId + "&client_secret=" + clientSecret + "&username=" + username + "&password=" + password)
                .retrieve()
                .bodyToMono(KeycloakToken.class)
                .block();
    }

}
