package org.pucrs.br.oauth.service;

import org.pucrs.br.oauth.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse authenticate(String username, String password);
}
