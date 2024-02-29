package com.terabite.authorization;

import java.util.List;
import java.util.Optional;

import com.terabite.authorization.config.RoleConfiguration;
import com.terabite.authorization.service.JwtService;

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
public class AuthorizationApi {

    public static final class Roles {
        public static final String EMAIL_VERIFIED= "ROLE_EMAIL_VERIFIED"; 
        public static final String TERMS_ACCEPTED = "ROLE_TERMS_ACCEPTED";
        public static final String ACCOUNT_SETUP = "ROLE_ACCOUNT_SETUP";
        public static final String COACH = "ROLE_COACH";
        public static final String USER = "ROLE_USER";
        public static final String SUBSCRIBED = "ROLE_SUBSCRIBED";
        public static final String ADMIN = "ROLE_ADMIN";
        public static final String BANNED = "ROLE_BANNED";
    }

    private final JwtService jwtService;

    public AuthorizationApi(final JwtService jwtService) {
        this.jwtService = jwtService;
    }

    /**
     * This method will check if the user is logged in.
     *
     * @param token The token that will be used to check if the user is logged in.
     * @return True if the user is logged in, false otherwise.
     */
    public boolean isUserLoggedIn(String token) {
        Optional<String> email = getEmailFromToken(token);
        // TODO: verify with LoginService to get user details
        if (email.isPresent() && jwtService.isTokenExpired(token)) {
            return true;
        }
        return false;
    }

    /**
     * This method will check if the user is authorized.
     * <p>
     *
     * @param token The token that will be used to check if the user is authorized.
     * @return True if the user is authorized, false otherwise.
     */
    public boolean isUserAuthorized(String token, final RoleConfiguration roleCongifuration) {
        if (!isUserLoggedIn(token)) {
            return false;
        }
        List<String> roles = getRolesFromToken(token);
        return roleCongifuration.validate(roles);
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
        return jwtService.extractUsername(token);
    }


    /**
     * This method will get all the roles from the token.
     * <p>
     *
     * @param token The token that will be used to check if the user is logged out.
     * @return True if the user is logged out, false otherwise.
     */
    public List<String> getRolesFromToken(String token) {
        return jwtService.extractRoles(token);
    }

}
