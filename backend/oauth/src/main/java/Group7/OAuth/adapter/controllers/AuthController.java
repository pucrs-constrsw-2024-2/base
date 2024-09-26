package Group7.OAuth.adapter.controllers;

import Group7.OAuth.application.dtos.JwtTokenDTO;
import Group7.OAuth.application.dtos.LoginDTO;
import Group7.OAuth.application.usecase.LoginUC;
import Group7.OAuth.application.usecase.RefreshTokenUC;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final LoginUC loginUC;

    private final RefreshTokenUC refreshTokenUC;

    @GetMapping("/validate-token")
    public ResponseEntity<Void> isValidToken() {
        return new ResponseEntity<Void>(HttpStatus.OK);
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
}
