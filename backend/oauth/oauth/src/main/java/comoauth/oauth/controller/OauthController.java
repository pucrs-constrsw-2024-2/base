package comoauth.oauth.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import comoauth.oauth.dto.ErrorResponse;
import comoauth.oauth.dto.UserDto;
import comoauth.oauth.dto.UserLoginDto;
import comoauth.oauth.dto.UserRegisterDto;
import comoauth.oauth.dto.UserRegisterResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api")
@Tag(name = "User Management", description = "Operations related to user management")
public class OauthController {

    @Autowired
    private comoauth.oauth.services.UserService userService;

    @PostMapping("/users")
    @Operation(summary = "Register a new user", description = "Creates a new user in Keycloak")
    public ResponseEntity<?> registerUser(
            @Parameter(description = "Authorization token", required = true) @RequestHeader("Authorization") String authorizationHeader,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "User registration details", required = true) @RequestBody UserRegisterDto userRegisterDto) {

        try {
            UserRegisterResponseDto result = userService.registerUser(authorizationHeader, userRegisterDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    @Operation(summary = "User login", description = "Authenticates a user and returns access tokens")
    public ResponseEntity<?> login(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "User login details", required = true) @RequestBody UserLoginDto userLoginDto) {

        try {
            Map<String, Object> tokens = userService.login(userLoginDto);
            return ResponseEntity.ok(tokens);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Login failed: " + e.getMessage());
        }
    }

    @GetMapping("/users")
    @Operation(summary = "Get all users", description = "Retrieves all registered users, optionally filtering by enabled status")
    public ResponseEntity<?> getAllUsers(
            @Parameter(description = "Authorization token", required = true) @RequestHeader("Authorization") String authorizationHeader,
            @Parameter(description = "Filter by enabled status") @RequestParam(value = "enabled", required = false) Boolean enabled) {

        try {
            List<UserDto> users = userService.getAllUsers(authorizationHeader, enabled);
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse(
                    "500",
                    e.getMessage(),
                    "OAuthAPI",
                    List.of(e.getStackTrace().toString()));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/users/{id}")
    @Operation(summary = "Get user by ID", description = "Retrieves a user by their unique ID")
    public ResponseEntity<?> getUserById(
            @Parameter(description = "Authorization token", required = true) @RequestHeader("Authorization") String authorizationHeader,
            @Parameter(description = "User ID", required = true) @PathVariable String id) {

        try {
            UserDto user = userService.getUserById(authorizationHeader, id);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse(
                    "500",
                    e.getMessage(),
                    "OAuthAPI",
                    List.of(e.getStackTrace().toString()));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PutMapping("/users/{id}")
    @Operation(summary = "Update a user", description = "Updates user information")
    public ResponseEntity<?> updateUser(
            @Parameter(description = "Authorization token", required = true) @RequestHeader("Authorization") String authorizationHeader,
            @Parameter(description = "User ID", required = true) @PathVariable String id,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Updated user details", required = true) @RequestBody UserDto userDto) {

        try {
            userService.updateUser(authorizationHeader, id, userDto);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse(
                    "500",
                    e.getMessage(),
                    "OAuthAPI",
                    List.of(e.getStackTrace().toString()));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PatchMapping("/users/{id}")
    @Operation(summary = "Update user password", description = "Updates the password of a user")
    public ResponseEntity<?> updateUserPassword(
            @Parameter(description = "Authorization token", required = true) @RequestHeader("Authorization") String authorizationHeader,
            @Parameter(description = "User ID", required = true) @PathVariable String id,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "New password", required = true) @RequestBody Map<String, String> passwordMap) {

        try {
            String newPassword = passwordMap.get("password");
            userService.updateUserPassword(authorizationHeader, id, newPassword);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse(
                    "500",
                    e.getMessage(),
                    "OAuthAPI",
                    List.of(e.getStackTrace().toString()));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @DeleteMapping("/users/{id}")
    @Operation(summary = "Delete a user", description = "Performs a logical deletion of a user by disabling their account")
    public ResponseEntity<?> deleteUser(
            @Parameter(description = "Authorization token", required = true) @RequestHeader("Authorization") String authorizationHeader,
            @Parameter(description = "User ID", required = true) @PathVariable String id) {

        try {
            userService.deleteUser(authorizationHeader, id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse(
                    "500",
                    e.getMessage(),
                    "OAuthAPI",
                    List.of(e.getStackTrace().toString()));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
