package org.pucrs.br.oauth.config;

import org.pucrs.br.oauth.dto.response.ErrorResponse;
import org.pucrs.br.oauth.exception.HttpException;
import org.pucrs.br.oauth.exception.InvalidEmailException;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final String ERROR_SOURCE = "OAuthAPI";

    @ExceptionHandler(HttpException.class)
    public ResponseEntity<ErrorResponse> handleHttpException(HttpException exception) {
        var errorResponse = ErrorResponse.builder()
                .errorCode(String.valueOf(exception.getStatusCode()))
                .errorDescription(exception.getMessage() + " - " + exception.getBody())
                .errorSource(ERROR_SOURCE)
                .errorStack(convertStackTraceToList(exception))
                .build();

        return ResponseEntity
                .status(exception.getStatusCode())
                .body(errorResponse);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorResponse> handleArgumentNotValidException(MethodArgumentNotValidException exception) {
        Optional<String> fieldErrorMessage = exception.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .filter(Objects::nonNull)
                .findAny();

        String errorMessage = fieldErrorMessage.orElse(exception.getMessage());
        var errorResponse = ErrorResponse.builder()
                .errorCode(HttpStatus.BAD_REQUEST.toString())
                .errorDescription(errorMessage)
                .errorSource(ERROR_SOURCE)
                .errorStack(convertStackTraceToList(exception))
                .build();

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(errorResponse);
    }

    @ExceptionHandler(InvalidEmailException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorResponse> handleInvalidEmailException(InvalidEmailException exception) {
        var errorResponse = ErrorResponse.builder()
                .errorCode(HttpStatus.BAD_REQUEST.toString())
                .errorDescription(exception.getMessage())
                .errorSource(ERROR_SOURCE)
                .errorStack(convertStackTraceToList(exception))
                .build();

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(errorResponse);
    }

    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ResponseEntity<ErrorResponse> handleAuthenticationException(AuthenticationException exception) {
        var errorResponse = ErrorResponse.builder()
                .errorCode(HttpStatus.UNAUTHORIZED.toString())
                .errorDescription("Usuário não autorizado")
                .errorSource(ERROR_SOURCE)
                .errorStack(convertStackTraceToList(exception))
                .build();

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(errorResponse);
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ResponseEntity<ErrorResponse> handleAuthorizationException(AccessDeniedException exception) {
        var errorResponse = ErrorResponse.builder()
                .errorCode(HttpStatus.FORBIDDEN.toString())
                .errorDescription("Usuário não permitido")
                .errorSource(ERROR_SOURCE)
                .errorStack(convertStackTraceToList(exception))
                .build();

        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(errorResponse);
    }

    private List<String> convertStackTraceToList(Exception exception) {
        return Arrays.stream(exception.getStackTrace())
                .map(StackTraceElement::toString)
                .collect(Collectors.toList());
    }
}
