package comoauth.oauth.dto;

import lombok.Data;

@Data()
public class UserDto {
    private String email;
    private String password;
    private String firstName;
    private String lastName;

    // Getters and Setters
}
