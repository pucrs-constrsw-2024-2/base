package org.pucrs.br.oauth.service;

import lombok.RequiredArgsConstructor;
import org.pucrs.br.oauth.client.KeycloakClient;
import org.pucrs.br.oauth.dto.request.UserRequest;
import org.pucrs.br.oauth.dto.response.UserResponse;
import org.pucrs.br.oauth.exception.InvalidEmailException;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private static final String VALID_EMAIL_REGEX = "^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$";
    private final KeycloakClient keycloakClient;

    @Override
    public UserResponse register(UserRequest userRequest, Jwt bearerToken) {

        Pattern pattern = Pattern.compile(VALID_EMAIL_REGEX);
        if (!pattern.matcher(userRequest.getUsername()).matches()) {
            throw new InvalidEmailException(userRequest.getUsername());
        }

        var createdUserLocation = keycloakClient.createUser(userRequest, bearerToken.getTokenValue());
        return UserResponse.builder()
                .id(createdUserLocation)
                .username(userRequest.getUsername())
                .firstName(userRequest.getFirstName())
                .lastName(userRequest.getLastName())
                .enabled(true)
                .build();
    }

    @Override
    public List<UserResponse> getAllUsers(Jwt accessToken, Boolean isEnabled) {
        List<UserResponse> users = keycloakClient.getAllUsers(accessToken.getTokenValue(), isEnabled);
        return users.stream()
        .map(user -> UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .enabled(user.isEnabled())
                .build())
        .collect(Collectors.toList());
    }

    @Override
    public UserResponse getUserById(UUID id, String accessToken) {
        UserResponse user = keycloakClient.getUserById(id, accessToken);
        return user;
    }

    @Override
    public UserResponse updateUser(UUID id, UserRequest userRequest, String accessToken) {
        UserResponse updatedUser = keycloakClient.updateUser(id, userRequest, accessToken);
        return updatedUser;
    }

    @Override
    public UserResponse updateUserPassword(UUID id, String updatePassword, String accessToken) {
        UserResponse updatedUser = keycloakClient.updateUserPassword(id, updatePassword, accessToken);
        return updatedUser;
    }

    @Override
    public void deleteUser(UUID id, String accessToken) {
        boolean isDeleted = keycloakClient.deleteUser(id, accessToken);    
        if (!isDeleted) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado");
        }
    }
}
