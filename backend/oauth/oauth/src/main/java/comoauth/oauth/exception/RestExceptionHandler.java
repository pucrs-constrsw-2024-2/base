package comoauth.oauth.exception;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import comoauth.oauth.dto.ErrorResponse;

@ControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<Object> handleCustomException(
            CustomException ex, WebRequest request) {

        ErrorResponse errorResponse = new ErrorResponse(
                ex.getErrorCode(),
                ex.getMessage(),
                ex.getErrorSource(),
                List.of(ex.getStackTrace().toString()));

        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        try {
            status = HttpStatus.valueOf(Integer.parseInt(ex.getErrorCode()));
        } catch (NumberFormatException e) {
            // Default to 500 if error code is not a valid HTTP status code
        }

        return new ResponseEntity<>(errorResponse, status);
    }

}
