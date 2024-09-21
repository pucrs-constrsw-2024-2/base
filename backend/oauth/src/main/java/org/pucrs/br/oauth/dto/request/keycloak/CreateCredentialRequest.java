package org.pucrs.br.oauth.dto.request.keycloak;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCredentialRequest {

    private String type;
    private String value;
    private boolean temporary;

    public CreateCredentialRequest(String value) {
        this.value = value;
        this.type = "password";
        this.temporary = false;
    }
}
