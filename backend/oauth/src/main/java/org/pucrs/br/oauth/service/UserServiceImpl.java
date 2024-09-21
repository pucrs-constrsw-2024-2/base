package org.pucrs.br.oauth.service;

import lombok.RequiredArgsConstructor;
import org.pucrs.br.oauth.client.KeycloakClient;
import org.pucrs.br.oauth.dto.request.UserRequest;
import org.pucrs.br.oauth.dto.response.UserResponse;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final KeycloakClient keycloakClient;

    @Override
    public UserResponse register(UserRequest userRequest, Jwt bearerToken) {
        var createdUserLocation = keycloakClient.createUser(userRequest, bearerToken.getTokenValue());
        return UserResponse.builder()
                .id(createdUserLocation)
                .username(userRequest.getUsername())
                .firstName(userRequest.getFirstName())
                .lastName(userRequest.getLastName())
                .enabled(true)
                .build();
    }
}
