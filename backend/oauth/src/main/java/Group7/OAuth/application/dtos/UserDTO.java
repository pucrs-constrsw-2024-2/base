package Group7.OAuth.application.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

public record UserDTO(
        UUID id,
        String username,
        @JsonProperty("first-name") String firstName,
        @JsonProperty("last-name") String lastName,
        Boolean enabled
) {
}
