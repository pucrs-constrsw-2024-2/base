package Group7.OAuth.adapter.controllers;

import Group7.OAuth.application.dtos.JwtTokenDTO;
import Group7.OAuth.application.dtos.LoginDTO;
import Group7.OAuth.application.dtos.UserDTO;
import Group7.OAuth.application.dtos.UserRequestDTO;
import Group7.OAuth.application.usecase.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final LoginUC loginUC;
    private final CreateUserUC createUserUC;
    private final GetUserUC getUserUC;
    private final GetUsersUC getUsersUC;
    private final UpdateUserUC updateUserUC;
    private final ChangePasswordUC changePasswordUC;
    private final DeleteUserUC deleteUserUC;
    private final RefreshTokenUC refreshTokenUC;

    private final JwtDecoder jwtDecoder;

    @GetMapping("/validateToken")
    public ResponseEntity<Boolean> isValidToken(@RequestHeader("Authorization") String tokenHeader) {
        try {
            String token = tokenHeader.replace("Bearer ", "");
            jwtDecoder.decode(token);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            return ResponseEntity.ok(false);
        }
    }


    @PostMapping(path = "/login")
    public ResponseEntity<JwtTokenDTO> login(@RequestBody LoginDTO loginDTO) {
        JwtTokenDTO jwtTokenDTO = loginUC.run(loginDTO.email(), loginDTO.password());
        return new ResponseEntity<>(jwtTokenDTO, HttpStatus.CREATED);
    }

    @PostMapping(path = "/refresh-token")
    public ResponseEntity<JwtTokenDTO> refreshToken(@RequestBody String refreshToken){
        JwtTokenDTO jwtTokenDTO = refreshTokenUC.run(refreshToken);
        return new ResponseEntity<>(jwtTokenDTO, HttpStatus.CREATED);
    }

    @PostMapping(path = "/users")
    public ResponseEntity<UserDTO> createUser(@RequestBody UserRequestDTO userRequestDTO, @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        UserDTO userDTO = createUserUC.run(authorizationHeader, userRequestDTO);
        return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
    }

    @GetMapping(path = "/users/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable UUID id, @RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        UserDTO userDTO = getUserUC.run(token, id);
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping(path = "/users")
    public ResponseEntity<Collection<UserDTO>> getUsers(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        return ResponseEntity.ok(getUsersUC.run(authorizationHeader));
    }

    @PutMapping(path = "/users/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable UUID id, @RequestBody UserRequestDTO userRequestDTO, @RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        UserDTO userDTO = updateUserUC.run(token, id, userRequestDTO);
        return ResponseEntity.ok(userDTO);
    }

    @PatchMapping(path = "/users/{id}")
    public ResponseEntity<Void> changeUserPassword(@PathVariable UUID id, @RequestBody String newPassword, @RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        changePasswordUC.run(token, id, newPassword);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(path = "/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id, @RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        deleteUserUC.run(token, id);
        return ResponseEntity.noContent().build();
    }
}
