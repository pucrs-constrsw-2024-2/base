package org.pucrs.br.oauth.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.pucrs.br.oauth.dto.request.LoginRequest;
import org.pucrs.br.oauth.dto.response.AuthResponse;
import org.pucrs.br.oauth.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping
    @CrossOrigin(origins = "*")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Autenticação de usuário")
    public AuthResponse authenticate(@Valid @ModelAttribute LoginRequest loginRequest) {
        log.info("POST /login - Iniciando login de usuario {}", loginRequest.getUsername());
        var token = authService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());
        log.info("POST /login - Login de usuario {} realizado com sucesso", loginRequest.getUsername());
        return token;
    }
}
