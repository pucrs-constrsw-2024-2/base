package Group7.OAuth.application.dtos;

import java.util.Collection;

public record ErrorDTO (
        String error_code,
        String error_description,
        String error_source,
        Collection<String> error_stack
    ) {
}
