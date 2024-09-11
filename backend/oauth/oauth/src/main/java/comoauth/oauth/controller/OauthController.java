// package comoauth.oauth.controller;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.http.*;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.client.RestTemplate;

// import java.util.HashMap;
// import java.util.Map;

// @RestController
// @RequestMapping("/api")
// public class OauthController {

//   @Value("${keycloak.url}")
//   private String keycloakUrl;

//   @Value("${keycloak.realm}")
//   private String realm;

//   @Value("${keycloak.client-id}")
//   private String clientId;

//   @Value("${keycloak.client-secret}")
//   private String clientSecret;

//   private final RestTemplate restTemplate = new RestTemplate();

//   @PostMapping("/login")
//   public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
//     String url = keycloakUrl + "/auth/realms/" + realm + "/protocol/openid-connect/token";

//     HttpHeaders headers = new HttpHeaders();
//     headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

//     Map<String, String> body = new HashMap<>();
//     body.put("client_id", clientId);
//     body.put("client_secret", clientSecret);
//     body.put("username", credentials.get("username"));
//     body.put("password", credentials.get("password"));
//     body.put("grant_type", "password");

//     HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

//     ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

//     return new ResponseEntity<>(response.getBody(), response.getStatusCode());
//   }
// }