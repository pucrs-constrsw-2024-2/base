package org.pucrs.br.oauth.controller;

import org.pucrs.br.oauth.model.User;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    // @Autowired
    // private final UserService userService;

    // public UserController(UserService userService) {
    // this.userService = userService;
    // }

    @PostMapping("/register")
    @CrossOrigin(origins = "*")
    public void register(@RequestBody User user) {
        return;
    }

    @PostMapping("/authenticate")
    @CrossOrigin(origins = "*")
    public void authenticate(@RequestParam String username, @RequestParam String password) {
        return;
    }

    @GetMapping("/health")
    @CrossOrigin(origins = "*")
    public void register() {
        return;
    }
}
