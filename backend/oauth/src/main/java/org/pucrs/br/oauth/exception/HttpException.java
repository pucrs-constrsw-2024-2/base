package org.pucrs.br.oauth.exception;

import lombok.Getter;

@Getter
public class HttpException extends RuntimeException {

    private final int statusCode;
    private final String body;

    public HttpException(String message, int statusCode, String body) {
        super(message);
        this.statusCode = statusCode;
        this.body = body;
    }
}
