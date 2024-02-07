package com.terabite.authorization.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.terabite.GlobalConfiguration;
import com.terabite.authorization.Payload;
import com.terabite.authorization.model.Login;
import com.terabite.authorization.repository.LoginNotFoundException;
import com.terabite.authorization.service.ForgotPasswordHelper;
import com.terabite.authorization.service.LoginService;
import com.terabite.authorization.service.SignupService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Arrays;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/auth")
public class AuthorizationController {

    private final String authCookieName;
    private final String domainUrl;

    private final LoginService loginService;
    private final SignupService signupService;
    private final ForgotPasswordHelper forgotPasswordHelper;

    private Logger log = LoggerFactory.getLogger(AuthorizationController.class);

    public AuthorizationController(ForgotPasswordHelper forgotPasswordHelper, LoginService loginService,
            SignupService signupService, @Qualifier(GlobalConfiguration.BEAN_NAME_AUTH_COOKIE_NAME) String authCookieName,@Qualifier(GlobalConfiguration.BEAN_NAME_DOMAIN_URL) String domainUrl){
        this.authCookieName = authCookieName;
        this.domainUrl = domainUrl;
        this.forgotPasswordHelper = forgotPasswordHelper;
        this.loginService = loginService;
        this.signupService = signupService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> userSignupPost(@RequestBody Login login) {
        // TODO:
        // lets have this return a session token (JWT) and then use this token to
        // temporarily authenticate the user
        // as if they had logged in. See signupService.signup for more details and check
        // the TODOs and FIXMEs to see what needs to be done
        ResponseEntity<?> response = signupService.signup(login);

        return response;
    }

    @PostMapping("/login")
    public ResponseEntity<?> userLoginPost(@RequestBody Login login, HttpServletResponse response) {

        Optional<String> token = loginService.login(login);

        if (token.isPresent()) {
            // README: Decided to store tokens in a special cookie
            // information from:
            // https://blog.logrocket.com/jwt-authentication-best-practices/#:~:text=To%20keep%20them%20secure%2C%20you,JavaScript%20running%20in%20the%20browser.

            // log that token is present and cookie is being sent
            log.info("Token is present and cookie is being sent");
            // set a cookie
            Cookie cookie = createAuthorizationCookie("login-token", token.get(), 60 * 60 * 24 * 7);

            response.addCookie(cookie);
            // we probably should only return ok without the token since it is sent back as
            // a cookie
            return ResponseEntity.ok(new Payload(token.get()));
        }

        log.error("Invalid login");
        return ResponseEntity.badRequest().body(new Payload("Invalid login"));

    }

    @PostMapping("/logout")
    public Payload userLogoutPost(HttpServletResponse response, HttpServletRequest request) {

        // README: Since wew ill eventually be using JWT, we wwill need a way to
        // invalidate
        // the tokens on logout. This is so that once logged out on that decide the
        // users are able to
        // log in and get a new token

        Optional<Cookie> tokenCookie = Arrays.stream(request.getCookies()).filter(cookie -> cookie.getName().equals("login-token")).findFirst();

        Cookie cookie = createAuthorizationCookie(authCookieName, "", 0);
        response.addCookie(cookie);

        return new Payload(String.format("logged out:%s", tokenCookie.orElseGet(() -> new Cookie("login-token", "none")).getValue()));
    }

    @PutMapping("/forgot_password")
    public ResponseEntity<String> forgotPassword(@RequestBody String jsonEmail) {
        return forgotPasswordHelper.processForgotPassword(jsonEmail);
    }

    @PutMapping("/reset_password")
    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestBody String jsonPassword)
            throws LoginNotFoundException {
        return forgotPasswordHelper.processResetPassword(token, jsonPassword);

    }

    private Cookie createAuthorizationCookie(String cookie, String value, int maxAge) {
        Cookie newCookie = new Cookie(cookie, value);
        newCookie.setHttpOnly(true);
        newCookie.setSecure(true);
        newCookie.setPath("/");
        newCookie.setMaxAge(maxAge);
        newCookie.setDomain(domainUrl);
        return newCookie;
    }
}
