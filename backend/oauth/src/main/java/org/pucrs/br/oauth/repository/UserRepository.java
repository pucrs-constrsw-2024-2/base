package org.pucrs.br.oauth.repository;

import org.pucrs.br.oauth.model.User;
import org.springframework.stereotype.Repository;

// @Repository
public interface UserRepository {
    User findByUsername(String username);

    void save(User user);
}
