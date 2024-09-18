package org.pucrs.br.oauth.service;

import org.pucrs.br.oauth.model.KeycloakAuth;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<KeycloakAuth> authenticate(String username, String password);
}
