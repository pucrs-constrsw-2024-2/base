package Group7.OAuth.adapter.controllers;

import Group7.OAuth.application.dtos.UserDTO;
import Group7.OAuth.application.dtos.UserRequestDTO;
import Group7.OAuth.application.usecase.CreateUserUC;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import Group7.OAuth.application.dtos.JwtTokenDTO;
import Group7.OAuth.application.dtos.LoginDTO;
import Group7.OAuth.application.usecase.LoginUC;
import lombok.RequiredArgsConstructor;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@RequiredArgsConstructor
@RestController
@RequestMapping
public class AuthController {

    private final LoginUC loginUC;

    private final CreateUserUC createUserUC;

    @PostMapping(path = "/login")
    public ResponseEntity<JwtTokenDTO> login(@RequestBody LoginDTO loginDTO) {
        try {
            JwtTokenDTO jwtTokenDTO = loginUC.run(loginDTO.email(), loginDTO.password());
            return new ResponseEntity<>(jwtTokenDTO, HttpStatus.CREATED);
        }
        catch (WebClientResponseException e) {
            return switch (e.getStatusCode().value()) {
                case 400 -> new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                case 401 -> new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                default -> new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            };

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/users")
    public ResponseEntity<UserDTO> createUser(
        @RequestBody UserRequestDTO userRequestDTO, 
        @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader
    ) {
        try {
            UserDTO userDTO = createUserUC.run(authorizationHeader, userRequestDTO);
            return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
        }
        catch (WebClientResponseException e) {
            System.out.println(e.getStatusCode().value());
            System.out.println(e.getResponseBodyAsString());
            return switch (e.getStatusCode().value()) {
                case 400 -> new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                case 401 -> new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                case 403 -> new ResponseEntity<>(HttpStatus.FORBIDDEN);
                case 409 -> new ResponseEntity<>(HttpStatus.CONFLICT);
                default -> new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            };

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
