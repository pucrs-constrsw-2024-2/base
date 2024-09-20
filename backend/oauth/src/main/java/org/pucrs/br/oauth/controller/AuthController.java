package org.pucrs.br.oauth.controller;

import org.pucrs.br.oauth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping
    @CrossOrigin(origins = "*")
    @ResponseStatus(HttpStatus.OK)
    public void authenticate(@RequestParam String username, @RequestParam String password) {
        //var token = authService.authenticate(username, password).getBody().accessToken;
    }
}
