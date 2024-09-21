package org.pucrs.br.oauth.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {

    @NotBlank(message = "Username precisa ser informado")
    private String username;
    @NotBlank(message = "Senha precisa ser informada")
    private String password;
    @NotBlank(message = "Primeiro nome precisa ser informado")
    private String firstName;
    @NotBlank(message = "Sobrenome precisa ser informado")
    private String lastName;

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.JSON_STYLE);
    }
}
