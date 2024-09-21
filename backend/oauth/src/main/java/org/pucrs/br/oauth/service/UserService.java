package org.pucrs.br.oauth.service;

import java.util.List;
import java.util.UUID;

import org.pucrs.br.oauth.dto.request.UserRequest;
import org.pucrs.br.oauth.dto.response.UserResponse;
import org.springframework.security.oauth2.jwt.Jwt;

public interface UserService {
    UserResponse register(UserRequest userRequest, Jwt accessToken);

    List<UserResponse> getAllUsers(Jwt accessToken, Boolean isEnabled);

    UserResponse getUserById(UUID id, String accessToken);

    UserResponse updateUser(UUID id, UserRequest userRequest, String accessToken);

    UserResponse updateUserPassword(UUID id, String updatePassword, String accessToken);

    void deleteUser(UUID id, String accessToken);
}
