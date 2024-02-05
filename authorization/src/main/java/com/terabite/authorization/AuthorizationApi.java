package com.terabite.authorization;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.terabite.authorization.model.LoginStatus;

/**
 * <h1>AuthorizationApi</h1>
 * <p>
 * This class will handle all authorization related operations such as
 * logging in, logging out, and resetting passwords as well as creating new
 * accounts.
 * <p>
 * Go through the AuthorizationApi class if you need to access authorization
 * information from another service in this same application.
 * <p>
 * The reasoning behind this is that if we decide to split this application into
 * microservices,
 * we can easily change the AuthorizationApi class to make requests to the
 * authorization service instead of the authorization database, or
 * authorization related utilities.
 */
@Service
public class AuthorizationApi {
    // README | FIX: This is probably best left as part of a commons library that will parse JWT tokens, 
    // since the main reason to use JWT is that we can verify the token without having to make a request to the authorization service.


    /**
     * This method will check if the user is logged in.
     *
     * @param token The token that will be used to check if the user is logged in.
     * @return True if the user is logged in, false otherwise.
     */
    public boolean isUserLoggedIn(String token) {
        Optional<ParsedToken> parsedToken = parseToken(token);
        if (parsedToken.isPresent()) {
            return parsedToken.get().getStatus().equals(LoginStatus.LOGGED_IN);
        }
        return false;
    }

    /**
     * This method will check if the user is authorized.
     * <p>
     * TODO: This might be better implemented some other way like with levels of
     * access
     * or roles, but for now we will just check if the user is authorized as a
     * blanked check.
     *
     * @param token The token that will be used to check if the user is authorized.
     * @return True if the user is authorized, false otherwise.
     */
    public boolean isUserAuthorized(String token) {
        Optional<ParsedToken> parsedToken = parseToken(token);
        if (parsedToken.isPresent()) {
            return parsedToken.get().isAuthorized();
        }
        return false;
    }

    /**
     * This method will check if the user is logged out.
     * <p>
     * This is important because its the way we identify users since emails are what
     * we are using as the primary key.
     *
     * @param token The token that will be used to check if the user is logged out.
     * @return True if the user is logged out, false otherwise.
     */
    public Optional<String> getEmailFromToken(String token) {
        Optional<ParsedToken> parsedToken = parseToken(token);
        if (parsedToken.isPresent()) {
            return Optional.of(parsedToken.get().getEmail());
        }
        return Optional.empty();
    }

    private Optional<ParsedToken> parseToken(String token) {

        String tokenPrefix = "authorized:";
        if (token.startsWith(tokenPrefix)) {
            String tokenBody = token.substring(tokenPrefix.length());
            String[] tokenParts = tokenBody.split("-");
            if (tokenParts.length == 2) {
                String email = tokenParts[0];
                String status = tokenParts[1];
                if (status.equals(LoginStatus.LOGGED_IN.toString())
                        || status.equals(LoginStatus.LOGGED_OUT.toString())) {
                    return Optional.of(new ParsedToken(true, email, LoginStatus.valueOf(status)));
                }
            }
        }
        return Optional.empty();
    }

    private class ParsedToken {
        private boolean isAuthorized;
        String email;
        LoginStatus status;

        public ParsedToken(boolean isAuthorized, String email, LoginStatus status) {
            this.isAuthorized = isAuthorized;
            this.email = email;
            this.status = status;
        }

        public boolean isAuthorized() {
            return isAuthorized;
        }

        public String getEmail() {
            return email;
        }

        public LoginStatus getStatus() {
            return status;
        }
    }

}
