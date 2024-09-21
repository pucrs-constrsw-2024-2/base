package org.pucrs.br.oauth.service;

import org.pucrs.br.oauth.dto.request.UserRequest;
import org.pucrs.br.oauth.dto.response.UserResponse;
import org.springframework.security.oauth2.jwt.Jwt;

public interface UserService {
    UserResponse register(UserRequest userRequest, Jwt accessToken);
}
