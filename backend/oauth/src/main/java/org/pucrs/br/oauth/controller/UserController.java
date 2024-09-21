package org.pucrs.br.oauth.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.pucrs.br.oauth.dto.request.PasswordRequest;
import org.pucrs.br.oauth.dto.request.UserRequest;
import org.pucrs.br.oauth.dto.response.UserResponse;
import org.pucrs.br.oauth.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    @CrossOrigin(origins = "*")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse createUser(@Valid @RequestBody UserRequest userRequest, @AuthenticationPrincipal Jwt jwt) {
        log.info("POST /users - Iniciando criacao de usuario com parametros: {}", userRequest.toString());
        UserResponse response = userService.register(userRequest, jwt);
        log.info("POST /users - Usuario {} criado com sucesso", userRequest.getUsername());
        return response;
    }

    @GetMapping
    @CrossOrigin(origins = "*")
    @ResponseStatus(HttpStatus.OK)
    public List<UserResponse> getAllUsers(@AuthenticationPrincipal Jwt jwt, @RequestParam(required = false) Boolean enabled) {
        log.info("GET /users - Iniciando recuperação de todos os usuários");
        List<UserResponse> response = userService.getAllUsers(jwt, enabled);
        log.info("GET /users - Usuarios {} recuperados com sucesso", response);
        return response;
    }

    @GetMapping("/{id}")
    @CrossOrigin(origins = "*")
    @ResponseStatus(HttpStatus.OK)
    public UserResponse getUserById(@PathVariable UUID id, @AuthenticationPrincipal Jwt jwt) {
        log.info("GET /users/{} - Iniciando recuperação de usuário", id);
        UserResponse user = userService.getUserById(id, jwt.getTokenValue());
        log.info("GET /users/{} - Usuário recuperado com sucesso", id);
        return user;
    }

    @PutMapping("/{id}")
    @CrossOrigin(origins = "*")
    @ResponseStatus(HttpStatus.OK)
    public UserResponse updateUser(@PathVariable UUID id, @Valid @RequestBody UserRequest userRequest, @AuthenticationPrincipal Jwt jwt) {
        log.info("PUT /users/{} - Iniciando atualização do usuário", id);
        UserResponse updatedUser = userService.updateUser(id, userRequest, jwt.getTokenValue());
        log.info("PUT /users/{} - Usuário atualizado com sucesso", id);
        return updatedUser;
    }

    @PatchMapping("/{id}")
    @CrossOrigin(origins = "*")
    @ResponseStatus(HttpStatus.OK)
    public UserResponse updateUserPassword(@PathVariable UUID id, @Valid @RequestBody PasswordRequest passwordRequest,
                                           @AuthenticationPrincipal Jwt jwt) {
        log.info("PATCH /users/{}/password - Iniciando atualização da senha do usuário", id);
        UserResponse updatedUser = userService.updateUserPassword(id, passwordRequest.getPassword(), jwt.getTokenValue());
        log.info("PATCH /users/{}/password - Senha do usuário atualizada com sucesso", id);
        return updatedUser;
    }

    @DeleteMapping("/{id}")
    @CrossOrigin(origins = "*")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable UUID id, @AuthenticationPrincipal Jwt jwt) {
        log.info("DELETE /users/{} - Iniciando exclusão do usuário", id);
        userService.deleteUser(id, jwt.getTokenValue());
        log.info("DELETE /users/{} - Usuário excluído com sucesso", id);
    }
}
