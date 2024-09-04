package org.pucrs.br.oauth.service;

import org.pucrs.br.oauth.model.User;

public interface UserService {
    User authenticate(String username, String password);
    void register(User user);
}
