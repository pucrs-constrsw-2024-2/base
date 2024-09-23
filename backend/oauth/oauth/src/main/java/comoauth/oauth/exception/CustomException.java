package comoauth.oauth.exception;

public class CustomException extends RuntimeException {
    private String errorCode;
    private String errorSource;

    public CustomException(String errorCode, String message, String errorSource) {
        super(message);
        this.errorCode = errorCode;
        this.errorSource = errorSource;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public String getErrorSource() {
        return errorSource;
    }
}
