package com.terabite.authorization.controller;

import com.terabite.GlobalConfiguration;
import com.terabite.authorization.dto.ApiResponse;
import com.terabite.authorization.dto.AuthRequest;
import com.terabite.authorization.dto.Payload;
import com.terabite.authorization.log.LoginNotFoundException;
import com.terabite.authorization.model.Login;
import com.terabite.authorization.repository.LoginRepository;
import com.terabite.authorization.service.ForgotPasswordHelper;
import com.terabite.authorization.service.JwtService;
import com.terabite.authorization.service.LoginService;
import com.terabite.authorization.service.SignupService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Optional;


@CrossOrigin(allowCredentials = "true", origins = "http://localhost:3000")
@RestController
@RequestMapping("/v1/auth")
public class AuthorizationController {

    private final String authCookieName;
    private final String domainUrl;

    private final LoginService loginService;
    private final SignupService signupService;
    private final ForgotPasswordHelper forgotPasswordHelper;

    private final JwtService jwtService;

    private final LoginRepository loginRepository;

    private final PasswordEncoder passwordEncoder;

    private Logger log = LoggerFactory.getLogger(AuthorizationController.class);

    public AuthorizationController(ForgotPasswordHelper forgotPasswordHelper, LoginService loginService,
                                   SignupService signupService, @Qualifier(GlobalConfiguration.BEAN_NAME_AUTH_COOKIE_NAME) String authCookieName, @Qualifier(GlobalConfiguration.BEAN_NAME_DOMAIN_URL) String domainUrl, JwtService jwtService, LoginRepository loginRepository, PasswordEncoder passwordEncoder) {
        this.authCookieName = authCookieName;
        this.domainUrl = domainUrl;
        this.forgotPasswordHelper = forgotPasswordHelper;
        this.loginService = loginService;
        this.signupService = signupService;
        this.jwtService = jwtService;
        this.loginRepository = loginRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> userSignupPost(@RequestBody AuthRequest authRequest) {
        // TODO:
        // lets have this return a session token (JWT) and then use this token to
        // temporarily authenticate the user
        // as if they had logged in. See signupService.signup for more details and check
        // the TODOs and FIXMEs to see what needs to be done
        ResponseEntity<?> response = signupService.signup(authRequest);

        return response;
    }

    /**
     * Deprecated. Not needed with JWT
     *
     * @param login
     * @param response
     * @return
     */
    @Deprecated
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
            Cookie cookie = createAuthorizationCookie(authCookieName, token.get(), 60 * 60 * 24 * 7);

            response.addCookie(cookie);
            // we probably should only return ok without the token since it is sent back as
            // a cookie
            return ResponseEntity.ok(new Payload(token.get()));
        }

        log.error("Was unable to login with the given credentials. Invalid login for email: {}, and password: {}", login.getEmail(), login.getPassword());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Payload("Invalid login"));

    }

    @Deprecated
    @PostMapping("/logout")
    public Payload userLogoutPost(HttpServletResponse response, HttpServletRequest request) {

        // README: Since wew ill eventually be using JWT, we wwill need a way to
        // invalidate
        // the tokens on logout. This is so that once logged out on that decide the
        // users are able to
        // log in and get a new token

        Optional<Cookie> tokenCookie = Arrays.stream(request.getCookies()).filter(cookie -> cookie.getName().equals(authCookieName)).findFirst();

        Cookie cookie = createAuthorizationCookie(authCookieName, "", 0);
        response.addCookie(cookie);

        return new Payload(String.format("logged out:%s", tokenCookie.orElseGet(() -> new Cookie(authCookieName, "none")).getValue()));
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


    @PostMapping("/get_token")
    public ResponseEntity<?> getToken(@RequestBody AuthRequest authRequest) {

//        Login storedLogin = loginRepository.findByEmail(login.getEmail())
//                .orElseThrow(() -> new LoginNotFoundException("Login email not found"));
//
//        if (passwordEncoder.matches(login.getPassword(), storedLogin.getPassword())) {
//            return jwtService.generateToken(login.getEmail());
//        } else {
////            throw new LoginNotFoundException("Invalid login");
//            return "Invalid login";
//        }

        Optional<Login> storedLogin = loginRepository.findByEmail(authRequest.getUsername());

        if (storedLogin.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse("Email not found", authRequest));
        }

        Login login = storedLogin.get();
        if (passwordEncoder.matches(authRequest.getPassword(), login.getPassword())) {
            String token = jwtService.generateToken(authRequest.getUsername());
            return ResponseEntity.ok(new ApiResponse("Success", token));
        } else {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse("Invalid password", authRequest));
        }

    }

    @GetMapping("/open_page")
    @PreAuthorize("hasAuthority('ROLE_UNVERIFIED')")
    public ResponseEntity<?> openPage() {
        return ResponseEntity.ok(new ApiResponse(HttpStatus.OK.toString(), "Reached open page"));
    }

    @GetMapping("/restricted_page")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> restrictedPage() {
        return ResponseEntity.ok(new ApiResponse(HttpStatus.OK.toString(), "Reached restricted page"));
    }

    @Deprecated
    private Cookie createAuthorizationCookie(String cookie, String value, int maxAge) {
        Cookie newCookie = new Cookie(cookie, value);
        newCookie.setPath("/");
        newCookie.setMaxAge(maxAge);
        newCookie.setDomain(domainUrl);
        return newCookie;
    }


}
