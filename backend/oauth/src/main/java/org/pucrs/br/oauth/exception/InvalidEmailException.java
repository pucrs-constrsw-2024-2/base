package org.pucrs.br.oauth.exception;

public class InvalidEmailException extends RuntimeException {

    public InvalidEmailException(String username) {
        super(String.format("Username %s não é um e-mail válido", username));
    }
}