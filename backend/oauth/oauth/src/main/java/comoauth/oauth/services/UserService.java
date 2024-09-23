package comoauth.oauth.services;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import comoauth.oauth.dto.UserDto;
import comoauth.oauth.dto.UserLoginDto;
import comoauth.oauth.dto.UserRegisterDto;

@Service
public class UserService {

    @Value("${keycloak.auth-server-url}")
    private String keycloakServerUrl;

    @Value("${keycloak.realm}")
    private String realm;

    @Value("${keycloak.clientid}")
    private String clientId;

    @Value("${keycloak.credentials.secret}")
    private String clientSecret;

    private final RestTemplate restTemplate = new RestTemplate();

    public String registerUser(String authorizationHeader, UserRegisterDto userDto) throws Exception {
        String createUserUrl = keycloakServerUrl + "/admin/realms/" + realm + "/users";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", authorizationHeader);

        Map<String, Object> user = new HashMap<>();
        user.put("username", userDto.getEmail());
        user.put("email", userDto.getEmail());
        user.put("firstName", userDto.getFirstName());
        user.put("lastName", userDto.getLastName());
        user.put("enabled", true);

        Map<String, Object> credentials = new HashMap<>();
        credentials.put("type", "password");
        credentials.put("value", userDto.getPassword());
        credentials.put("temporary", false);

        user.put("credentials", Collections.singletonList(credentials));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(user, headers);

        ResponseEntity<Void> response = restTemplate.postForEntity(createUserUrl, request, Void.class);

        if (response.getStatusCode() == HttpStatus.CREATED) {
            return response.getHeaders().getLocation().toString() + "Email: " + userDto.getEmail() + "Password: "
                    + userDto.getPassword() + "FirstName: " + userDto.getFirstName() + "LastName: "
                    + userDto.getLastName();
        } else {
            throw new Exception("Failed to create user: " + response.getStatusCode());
        }
    }

    public String login(UserLoginDto userLoginDto) throws Exception {
        String tokenUrl = keycloakServerUrl + "/realms/" + realm + "/protocol/openid-connect/token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("grant_type", "password");
        map.add("client_id", clientId);
        map.add("client_secret", clientSecret);
        map.add("username", userLoginDto.getEmail());
        map.add("password", userLoginDto.getPassword());

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(tokenUrl, request, String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            return response.getBody();
        } else {
            throw new Exception("Invalid credentials");
        }
    }

    public List<UserDto> getAllUsers(String authorizationHeader, Boolean enabled) throws Exception {
        String url = keycloakServerUrl + "/admin/realms/" + realm + "/users";

        // Add query parameter if 'enabled' is specified
        if (enabled != null) {
            url += "?enabled=" + enabled;
        }

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", authorizationHeader);

        HttpEntity<Void> request = new HttpEntity<>(headers);

        ResponseEntity<UserDto[]> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                request,
                UserDto[].class);

        if (response.getStatusCode() == HttpStatus.OK) {
            return Arrays.asList(response.getBody());
        } else {
            throw new Exception("Failed to retrieve users: " + response.getStatusCode());
        }
    }

    public UserDto getUserById(String authorizationHeader, String id) throws Exception {
        String url = keycloakServerUrl + "/admin/realms/" + realm + "/users/" + id;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", authorizationHeader);

        HttpEntity<Void> request = new HttpEntity<>(headers);

        ResponseEntity<UserDto> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                request,
                UserDto.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            return response.getBody();
        } else if (response.getStatusCode() == HttpStatus.NOT_FOUND) {
            throw new Exception("User not found");
        } else {
            throw new Exception("Failed to retrieve user: " + response.getStatusCode());
        }
    }

    public void updateUser(String authorizationHeader, String id, UserDto userDto) throws Exception {
        String url = keycloakServerUrl + "/admin/realms/" + realm + "/users/" + id;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", authorizationHeader);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Map userDto to a Map or directly use userDto if compatible
        Map<String, Object> userMap = new HashMap<>();
        userMap.put("firstName", userDto.getFirstName());
        userMap.put("lastName", userDto.getLastName());
        userMap.put("email", userDto.getEmail());
        userMap.put("enabled", userDto.isEnabled());

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(userMap, headers);

        ResponseEntity<Void> response = restTemplate.exchange(
                url,
                HttpMethod.PUT,
                request,
                Void.class);

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new Exception("Failed to update user: " + response.getStatusCode());
        }
    }

    public void updateUserPassword(String authorizationHeader, String id, String newPassword) throws Exception {
        String url = keycloakServerUrl + "/admin/realms/" + realm + "/users/" + id + "/reset-password";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", authorizationHeader);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> credential = new HashMap<>();
        credential.put("type", "password");
        credential.put("value", newPassword);
        credential.put("temporary", false);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(credential, headers);

        ResponseEntity<Void> response = restTemplate.exchange(
                url,
                HttpMethod.PUT,
                request,
                Void.class);

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new Exception("Failed to update user password: " + response.getStatusCode());
        }
    }

    public void deleteUser(String authorizationHeader, String id) throws Exception {
        String url = keycloakServerUrl + "/admin/realms/" + realm + "/users/" + id;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", authorizationHeader);

        Map<String, Object> userMap = new HashMap<>();
        userMap.put("enabled", false);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(userMap, headers);

        ResponseEntity<Void> response = restTemplate.exchange(
                url,
                HttpMethod.PUT,
                request,
                Void.class);

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new Exception("Failed to disable user: " + response.getStatusCode());
        }
    }

}
