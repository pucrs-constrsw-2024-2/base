package org.pucrs.br.oauth.controller;

import java.util.Map;

import org.pucrs.br.oauth.config.KeycloakConfig;
import org.pucrs.br.oauth.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/users")
public class UserController {

    @Autowired
    private KeycloakConfig keycloakConfig;


    @PostMapping
    @CrossOrigin(origins = "*")
    public void register(@RequestBody User user) {
        return;
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody Map<String, Object> userPayload) {
        try {
            String token = keycloakConfig.getAdminAccessToken();

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + token);
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(userPayload, headers);
            ResponseEntity<Map> response = keycloakConfig.getKeycloakRestClient()
                .post()
                .uri("/admin/realms/{realm}/users", keycloakConfig.getKeycloakRealm())
                .body(request)
                .retrieve()
                .toEntity(Map.class);
            return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating user: " + e.getMessage());
        }
    }
}
