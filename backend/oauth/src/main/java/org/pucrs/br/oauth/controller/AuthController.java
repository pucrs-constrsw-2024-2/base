package org.pucrs.br.oauth.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/auth")
public class AuthController {

    @PostMapping
    @CrossOrigin(origins = "*")
    public void authenticate(@RequestParam String username, @RequestParam String password) {
        System.out.println("Username: " + username);
    }
}
