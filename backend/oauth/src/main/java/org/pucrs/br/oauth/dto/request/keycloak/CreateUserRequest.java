package org.pucrs.br.oauth.dto.request.keycloak;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserRequest {

    private String username;
    @Builder.Default
    private boolean enabled = true;
    private String firstName;
    private String lastName;
    private String email;
    @Builder.Default
    private boolean emailVerified = false;
    private CreateCredentialRequest[] credentials;
}
