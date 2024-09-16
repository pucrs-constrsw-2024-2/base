package Group7.OAuth.application.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

public record UserRequestDTO(
        String username,
        String password,
        @JsonProperty("first-name") String firstName,
        @JsonProperty("last-name") String lastName,
        Boolean enabled
) {
}
