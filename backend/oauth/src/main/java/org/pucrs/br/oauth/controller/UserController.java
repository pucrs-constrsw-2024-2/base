package org.pucrs.br.oauth.controller;

import lombok.RequiredArgsConstructor;
import org.pucrs.br.oauth.model.User;
import org.pucrs.br.oauth.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public void register(@RequestBody User user) {
        userService.register(user);
    }

    @PostMapping("/authenticate")
    public User authenticate(@RequestParam String username, @RequestParam String password) {
        return userService.authenticate(username, password);
    }
}
