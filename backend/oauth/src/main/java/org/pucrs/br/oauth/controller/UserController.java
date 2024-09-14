package org.pucrs.br.oauth.controller;

import org.pucrs.br.oauth.model.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/users")
public class UserController {

    @PostMapping
    @CrossOrigin(origins = "*")
    public void register(@RequestBody User user) {
    }
}
