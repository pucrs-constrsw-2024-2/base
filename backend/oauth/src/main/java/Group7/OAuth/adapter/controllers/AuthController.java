package Group7.OAuth.adapter.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Group7.OAuth.application.dtos.JwtTokenDTO;
import Group7.OAuth.application.dtos.LoginDTO;
import Group7.OAuth.application.usecase.LoginUC;
import Group7.OAuth.application.usecase.RefreshTokenUC;
import Group7.OAuth.application.usecase.ValidateTokenUC;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final LoginUC loginUC;

    private final RefreshTokenUC refreshTokenUC;

    private final ValidateTokenUC validateTokenUC;

    @CrossOrigin(origins = "*")
    @GetMapping("/validate-token")
    @Operation(summary = "Validação de token de usuário")
    public ResponseEntity<Void> isValidToken(@RequestHeader String resource,
            @RequestHeader String method,
            @AuthenticationPrincipal Jwt jwt) {
        validateTokenUC.run(jwt.getTokenValue(), resource, method);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @PostMapping(path = "/login")
    @Operation(summary = "Autenticação de usuário")
    public ResponseEntity<JwtTokenDTO> login(@RequestBody LoginDTO loginDTO) {
        JwtTokenDTO jwtTokenDTO = loginUC.run(loginDTO.email(), loginDTO.password());
        return new ResponseEntity<>(jwtTokenDTO, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "*")
    @PostMapping(path = "/refresh-token")
    @Operation(summary = "Refresh de token de usuário")
    public ResponseEntity<JwtTokenDTO> refreshToken(@RequestBody String refreshToken) {
        JwtTokenDTO jwtTokenDTO = refreshTokenUC.run(refreshToken);
        return new ResponseEntity<>(jwtTokenDTO, HttpStatus.CREATED);
    }
}
