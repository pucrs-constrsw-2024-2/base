package comoauth.oauth.dto;

import java.util.List;

import lombok.Data;

@Data
public class ErrorResponse {
    private String errorCode;
    private String errorDescription;
    private String errorSource;
    private List<String> errorStack;

    public ErrorResponse(String errorCode, String errorDescription, String errorSource, List<String> errorStack) {
        this.errorCode = errorCode;
        this.errorDescription = errorDescription;
        this.errorSource = errorSource;
        this.errorStack = errorStack;
    }
}
