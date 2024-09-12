package org.pucrs.br.oauth.service;

import lombok.RequiredArgsConstructor;
import org.pucrs.br.oauth.model.User;
import org.pucrs.br.oauth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    // @Autowired
    // private final UserRepository userRepository;

    @Override
    public User authenticate(String username, String password) {
        return null;
    }

    @Override
    public void register(User user) {
        return;
    }
}
