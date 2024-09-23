package comoauth.oauth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "User data transfer object")
public class UserDto {

    @Schema(description = "User ID", example = "123e4567-e89b-12d3-a456-426614174000")
    private String id;

    @Schema(description = "Username (email)", example = "user@example.com")
    private String username;

    @Schema(description = "First name", example = "John")
    private String firstName;

    @Schema(description = "Last name", example = "Doe")
    private String lastName;

    @Schema(description = "Email address", example = "user@example.com")
    private String email;

    @Schema(description = "Account enabled status", example = "true")
    private boolean enabled;
}
