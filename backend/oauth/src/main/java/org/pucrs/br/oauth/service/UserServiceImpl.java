package org.pucrs.br.oauth.service;

import lombok.RequiredArgsConstructor;
import org.pucrs.br.oauth.client.KeycloakClient;
import org.pucrs.br.oauth.dto.request.UserRequest;
import org.pucrs.br.oauth.dto.response.UserResponse;
import org.pucrs.br.oauth.exception.InvalidEmailException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.util.regex.Pattern;

@Component
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private static final String VALID_EMAIL_REGEX = "^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$";
    private final KeycloakClient keycloakClient;

    @Override
    public UserResponse register(UserRequest userRequest, Jwt bearerToken) {

        // Validate email
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
}
