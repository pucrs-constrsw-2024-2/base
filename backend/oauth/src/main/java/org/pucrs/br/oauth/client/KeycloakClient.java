package org.pucrs.br.oauth.client;

import lombok.RequiredArgsConstructor;
import org.pucrs.br.oauth.config.KeycloakConfig;
import org.pucrs.br.oauth.dto.request.UserRequest;
import org.pucrs.br.oauth.dto.request.keycloak.CreateCredentialRequest;
import org.pucrs.br.oauth.dto.request.keycloak.CreateUserRequest;
import org.pucrs.br.oauth.dto.request.keycloak.UpdatePasswordRequest;
import org.pucrs.br.oauth.dto.request.keycloak.UpdateUserRequest;
import org.pucrs.br.oauth.dto.response.UserResponse;
import org.pucrs.br.oauth.dto.response.keycloak.TokenResponse;
import org.pucrs.br.oauth.exception.HttpException;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
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
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

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

    public List<UserResponse> getAllUsers(String accessToken, Boolean isEnabled) {
        ResponseEntity<List<UserResponse>> response = keycloakRestClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/admin/realms/{realm}/users")
                        .build(keycloakConfig.getKeycloakRealm()))
                .headers(headers -> {
                    headers.setContentType(MediaType.APPLICATION_JSON);
                    headers.setBearerAuth(accessToken);
                })
                .retrieve()
                .onStatus(HttpStatusCode::isError, handleHttpError("Erro ao buscar usuários com Keycloak"))
                .toEntity(new ParameterizedTypeReference<>() {
                });
        if (Objects.isNull(isEnabled)) {
            return response.getBody();
        }
        return response.getBody().stream()
                .filter(user -> user.isEnabled() == isEnabled)
                .collect(Collectors.toList());
    }

    public UserResponse getUserById(UUID id, String accessToken) {
        ResponseEntity<UserResponse> response = keycloakRestClient.get()
                .uri("/admin/realms/{realm}/users/{id}", keycloakConfig.getKeycloakRealm(), id)
                .headers(headers -> {
                    headers.setBearerAuth(accessToken);
                })
                .retrieve()
                .onStatus(HttpStatusCode::isError, handleHttpError("Erro ao buscar usuário com Keycloak"))
                .toEntity(UserResponse.class);
        return response.getBody();
    }

    public UserResponse updateUser(UUID id, UserRequest userRequest, String accessToken) {
        var requestBody = UpdateUserRequest.builder()
                .email(userRequest.getUsername())
                .username(userRequest.getUsername())
                .firstName(userRequest.getFirstName())
                .lastName(userRequest.getLastName())
                .credentials(new CreateCredentialRequest[]{new CreateCredentialRequest(userRequest.getPassword())})
                .build();

        ResponseEntity<UserResponse> response = keycloakRestClient.put()
                .uri("/admin/realms/{realm}/users/{id}", keycloakConfig.getKeycloakRealm(), id)
                .headers(headers -> {
                    headers.setContentType(MediaType.APPLICATION_JSON);
                    headers.setBearerAuth(accessToken);
                })
                .body(requestBody)
                .retrieve()
                .onStatus(HttpStatusCode::isError, handleHttpError("Erro ao atualizar usuário com Keycloak"))
                .toEntity(UserResponse.class);

        return response.getStatusCode() == HttpStatus.NOT_FOUND ? null : response.getBody();
    }

    public UserResponse updateUserPassword(UUID id, String updatePassword, String accessToken) {
        UpdatePasswordRequest updatePasswordRequestBody = new UpdatePasswordRequest();
        updatePasswordRequestBody.setCredentials(new CreateCredentialRequest[]{new CreateCredentialRequest(updatePassword)});

        ResponseEntity<UserResponse> response = keycloakRestClient.put()
                .uri("/admin/realms/{realm}/users/{id}", keycloakConfig.getKeycloakRealm(), id)
                .headers(headers -> {
                    headers.setContentType(MediaType.APPLICATION_JSON);
                    headers.setBearerAuth(accessToken);
                })
                .body(updatePasswordRequestBody)
                .retrieve()
                .onStatus(HttpStatusCode::isError, handleHttpError("Erro ao atualizar senha de usuário com Keycloak"))
                .toEntity(UserResponse.class);
        return response.getStatusCode() == HttpStatus.NOT_FOUND ? null : response.getBody();
    }

    public boolean disableUser(UUID id, String accessToken) {
        Map<String, Object> disableUserRequestBody = Map.of("enabled", false);

        ResponseEntity<Void> response = keycloakRestClient.put()
                .uri("/admin/realms/{realm}/users/{id}", keycloakConfig.getKeycloakRealm(), id)
                .headers(headers -> {
                    headers.setBearerAuth(accessToken);
                })
                .body(disableUserRequestBody)
                .retrieve()
                .onStatus(HttpStatusCode::isError, handleHttpError("Erro ao deletar usuário com Keycloak"))
                .toEntity(Void.class);

        return response.getStatusCode() == HttpStatus.NO_CONTENT;
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
