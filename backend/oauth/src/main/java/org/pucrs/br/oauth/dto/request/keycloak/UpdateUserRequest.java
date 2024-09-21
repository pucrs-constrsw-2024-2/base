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
public class UpdateUserRequest {

    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private CreateCredentialRequest[] credentials;
}
