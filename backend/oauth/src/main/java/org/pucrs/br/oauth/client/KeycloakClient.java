package org.pucrs.br.oauth.client;

import lombok.RequiredArgsConstructor;
import org.pucrs.br.oauth.config.KeycloakConfig;
import org.pucrs.br.oauth.dto.request.UserRequest;
import org.pucrs.br.oauth.dto.request.keycloak.CreateCredentialRequest;
import org.pucrs.br.oauth.dto.request.keycloak.CreateUserRequest;
import org.pucrs.br.oauth.dto.response.keycloak.TokenResponse;
import org.pucrs.br.oauth.exception.HttpException;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestClient;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class KeycloakClient {

    private final RestClient keycloakRestClient;
    private final KeycloakConfig keycloakConfig;

    public TokenResponse generateAccessToken(String username, String password) {
        var formData = new LinkedMultiValueMap<String, String>();
        formData.add("grant_type", "password");
        formData.add("client_id", keycloakConfig.getClientId());
        formData.add("client_secret", keycloakConfig.getClientSecret());
        formData.add("username", username);
        formData.add("password", password);

        ResponseEntity<TokenResponse> keycloakResponse = keycloakRestClient.post()
                .uri("/realms/{realm}/protocol/openid-connect/token", keycloakConfig.getKeycloakRealm())
                .headers(headers -> headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED))
                .body(formData)
                .retrieve()
                .onStatus(HttpStatusCode::isError, handleHttpError("Erro ao realizar autenticação com Keycloak"))
                .toEntity(TokenResponse.class);

        return keycloakResponse.getBody();
    }

    public UUID createUser(UserRequest userRequest, String accessToken) {
        var requestBody = CreateUserRequest.builder()
                .email(userRequest.getUsername())
                .username(userRequest.getUsername())
                .firstName(userRequest.getFirstName())
                .lastName(userRequest.getLastName())
                .credentials(new CreateCredentialRequest[]{new CreateCredentialRequest(userRequest.getPassword())})
                .build();

        ResponseEntity<String> keycloakResponse = keycloakRestClient.post()
                .uri("/admin/realms/{realm}/users", keycloakConfig.getKeycloakRealm())
                .headers(headers -> {
                    headers.setContentType(MediaType.APPLICATION_JSON);
                    headers.setBearerAuth(accessToken);
                })
                .body(requestBody)
                .retrieve()
                .onStatus(HttpStatusCode::isError, handleHttpError("Erro ao criar usuário com Keycloak"))
                .toEntity(String.class);

        String userLocation = keycloakResponse.getHeaders().getFirst("LOCATION");
        Path userLocationPath = Paths.get(userLocation);
        Path lastSegment = userLocationPath.getName(userLocationPath.getNameCount() - 1);
        return UUID.fromString(lastSegment.toString());
    }

    private RestClient.ResponseSpec.ErrorHandler handleHttpError(final String errorMessage) {
        return (request, response) -> {
            try (InputStream bodyInputStream = response.getBody()) {
                String responseBody = new String(bodyInputStream.readAllBytes(), StandardCharsets.UTF_8);
                throw new HttpException(errorMessage, response.getStatusCode().value(), responseBody);
            }
        };
    }
}
