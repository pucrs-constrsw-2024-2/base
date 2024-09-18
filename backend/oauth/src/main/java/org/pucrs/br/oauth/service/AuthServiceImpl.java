
package org.pucrs.br.oauth.service;

import lombok.RequiredArgsConstructor;
import org.pucrs.br.oauth.client.KeycloakClient;
import org.pucrs.br.oauth.model.Auth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    @Autowired
    private final KeycloakClient keycloakClient;

    @Override
    public ResponseEntity<Auth> authenticate(String username, String password) {
        return keycloakClient.auth(username, password);
    }
}
