package com.terabite.authorization;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.context.annotation.Lazy;

import com.terabite.authorization.config.RoleConfiguration;
import com.terabite.authorization.model.Login;
import com.terabite.authorization.model.LoginDetails;
import com.terabite.authorization.repository.LoginRepository;
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

    // ADD MORE ROLES HERE
    public static enum Roles {
        ROLE_EMAIL_VERIFIED,
        ROLE_TERMS_ACCEPTED,
        ROLE_ACCOUNT_SETUP,
        ROLE_COACH,
        ROLE_USER ,
        ROLE_SUBSCRIBED ,
        ROLE_ADMIN,
        ROLE_BANNED;

        private static HashMap<String, Roles> roles = new HashMap<String, Roles>();
        static{
            for(Roles role : Roles.values()){
                roles.put(role.name(), role);
            }
        }

        public static Optional<Roles> getRoleByName(String role) {
            return Optional.ofNullable(roles.get(role));
        }
    }

    private final JwtService jwtService;
    private final LoginRepository loginRepository;

    public AuthorizationApi(final JwtService jwtService, @Lazy final LoginRepository loginRepository) {
        this.jwtService = jwtService;
        this.loginRepository = loginRepository;
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
        List<Roles> roles = getRolesFromToken(token).stream().map(role -> Roles.getRoleByName(role))
            .filter(role -> role.isPresent()).map(role -> role.get()).toList();
        return roleCongifuration.validateRolesList(roles);
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

    public boolean addRoleToUserFromToken(String token, final Roles role) {
        Optional<String> email = getEmailFromToken(token);
        if (email.isEmpty()) {
            return false;
        }

        final Optional<Login> login = loginRepository.findByEmail(email.get());
        if (login.isEmpty()) {
            return false;
        }

        final boolean successfull = login.get().addRole(role.name());
        if (successfull) {
            loginRepository.save(login.get());
        }

        return successfull;
    }

    public Optional<String> refreshToken(String token) {
        Optional<String> email = jwtService.extractUsername(token);
        if (email.isEmpty()) {
            return Optional.empty();
        }
        
        Optional<Login> login = loginRepository.findByEmail(email.get());
        if (login.isEmpty()){
            return Optional.empty();
        }

        return Optional.of(jwtService.generateToken(LoginDetails.of(login.get())));
    }

}
