package org.pucrs.br.oauth.service;

import org.pucrs.br.oauth.model.Auth;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<Auth> authenticate(String username, String password);
}
