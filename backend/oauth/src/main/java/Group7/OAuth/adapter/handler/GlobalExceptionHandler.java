package Group7.OAuth.adapter.handler;

import Group7.OAuth.application.dtos.ErrorDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.reactive.function.client.WebClientRequestException;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.List;

@RequiredArgsConstructor
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Throwable.class)
    public ResponseEntity<ErrorDTO> handle(Throwable e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorDTO(
                        String.valueOf(HttpStatus.INTERNAL_SERVER_ERROR.value()),
                        "Erro interno do servidor.",
                        "OAuth",
                        List.of(e.getMessage())
                ));
    }

    @ExceptionHandler(WebClientRequestException.class)
    public ResponseEntity<ErrorDTO> handle(WebClientRequestException e) {
        ErrorDTO errorDTO = new ErrorDTO(
                String.valueOf(HttpStatus.BAD_REQUEST.value()),
                "Requisição inválida. Verifique os parâmetros.",
                "OAuth",
                List.of(e.getMessage())
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorDTO);
    }

    @ExceptionHandler(WebClientResponseException.class)
    public ResponseEntity<ErrorDTO> handle(WebClientResponseException e) {
        return ResponseEntity.status(HttpStatus.valueOf(e.getStatusCode().value()))
                .body(new ErrorDTO(
                        String.valueOf(e.getStatusCode().value()),
                        handleStatusCode(e.getStatusCode()),
                        "OAuth",
                        List.of(e.getResponseBodyAsString())
                ));
    }

    private String handleStatusCode(HttpStatusCode status) {

        return switch (HttpStatus.valueOf(status.value())) {
            case BAD_REQUEST -> "Requisição inválida. Verifique os parâmetros.";
            case UNAUTHORIZED -> "Não autorizado. Verifique suas credenciais.";
            case FORBIDDEN -> "Acesso proibido. Você não tem permissão para esta ação.";
            case NOT_FOUND -> "Recurso não encontrado.";
            case INTERNAL_SERVER_ERROR -> "Erro interno do servidor.";
            case CONFLICT -> "Conflito.";
            default -> "Erro desconhecido.";
        };

    }
}
