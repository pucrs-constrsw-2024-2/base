package Group7.OAuth.application.usecase;

import Group7.OAuth.adapter.keycloak.KeycloakAdapter;
import Group7.OAuth.adapter.keycloak.KeycloakMapper;
import Group7.OAuth.application.dtos.UserDTO;
import Group7.OAuth.application.dtos.UserRequestDTO;
import Group7.OAuth.application.exception.InvalidEmailException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.regex.Pattern;

@RequiredArgsConstructor
@Component
public class CreateUserUC {
    private static final String VALID_EMAIL_REGEX = "^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$";

    private final KeycloakAdapter keycloakAdapter;

    private final KeycloakMapper keycloakMapper;

    public UserDTO run(String authorizationHeader, UserRequestDTO user) {
        Pattern pattern = Pattern.compile(VALID_EMAIL_REGEX);
        if (!pattern.matcher(user.username()).matches()) {
            throw new InvalidEmailException(user.username());
        }
        return keycloakMapper.toUserDTO(keycloakAdapter.createUser(authorizationHeader, keycloakMapper.toKeycloakUserRegistration(user)));
    }
}


