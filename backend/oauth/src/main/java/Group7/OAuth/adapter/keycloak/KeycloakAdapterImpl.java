package Group7.OAuth.adapter.keycloak;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class KeycloakAdapterImpl implements KeycloakAdapter {
    private final String url;

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
        this.url = url;
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

    @Override
    public KeycloakUser createUser(KeycloakUserRegistration userRegistration) {
        KeycloakToken token = authenticateClient();

        ResponseEntity<Void> response = webClient.post()
                    .uri(uriBuilder -> uriBuilder
                            .path("/admin/realms/{realm}/users")
                            .build(realm))
                    .header("Authorization", "Bearer " + token.access_token())
                    .header("Content-Type", "application/json")
                    .body(BodyInserters.fromValue(userRegistration))
                    .retrieve()
                    .toBodilessEntity()
                    .block();

        assert response != null;
        return new KeycloakUser(getUserId(getHeaderValue(response.getHeaders())), userRegistration.username(), userRegistration.firstName(), userRegistration.lastName(), userRegistration.enabled());
    }
    private KeycloakToken authenticateClient() {
        return webClient
                .post()
                .uri(uriBuilder -> uriBuilder
                        .path("/realms/{realm}/protocol/openid-connect/token")
                        .build(realm))
                .body(BodyInserters.fromFormData("client_id", clientId)
                        .with("client_secret", clientSecret)
                        .with("grant_type", "client_credentials"))
                .retrieve()
                .bodyToMono(KeycloakToken.class)
                .block();
    }

    private String getHeaderValue(HttpHeaders headers) {
        return headers.getFirst("Location");
    }

    private UUID getUserId(String location) {
        Matcher matcher = Pattern.compile("/users/(.*)$").matcher(location);
        if (matcher.find()) {
            return UUID.fromString(matcher.group(1));
        }
        return null;
    }


}
