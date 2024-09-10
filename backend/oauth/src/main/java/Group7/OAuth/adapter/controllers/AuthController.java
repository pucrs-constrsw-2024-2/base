package Group7.OAuth.adapter.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Group7.OAuth.application.dtos.JwtTokenDTO;
import Group7.OAuth.application.usecase.LoginUC;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final LoginUC loginUC;

    @PostMapping(path = "/login")
    public ResponseEntity<JwtTokenDTO> login(String email, String password) {
        return ResponseEntity.ok(loginUC.run(email, password));
    }


}
