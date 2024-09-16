package Group7.OAuth.adapter.keycloak;

import Group7.OAuth.application.dtos.UserDTO;
import Group7.OAuth.application.dtos.UserRequestDTO;
import org.springframework.stereotype.Component;

import Group7.OAuth.application.dtos.JwtTokenDTO;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class KeycloakMapper {
    public JwtTokenDTO toTokenDTO(KeycloakToken keycloakToken) {
        return new JwtTokenDTO(keycloakToken.access_token(),
                keycloakToken.expires_in(),
                keycloakToken.refresh_expires_in(),
                keycloakToken.refresh_token(),
                keycloakToken.token_type(),
                keycloakToken.not_before_policy(),
                keycloakToken.session_state(),
                keycloakToken.scope());
    }

    public KeycloakUserRegistration toKeycloakUserRegistration(UserRequestDTO user) {
        return new KeycloakUserRegistration(user.username(), user.username(), user.firstName(), user.lastName(), user.enabled(), Arrays.asList(new KeycloackCredential("password", user.password(), false)));
    }

    public UserDTO toUserDTO(KeycloakUser user) {
        return new UserDTO(user.id(), user.email(), user.firstName(), user.lastName(), user.enabled());
    }
}
