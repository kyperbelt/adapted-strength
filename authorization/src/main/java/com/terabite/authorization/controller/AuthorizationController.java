package com.terabite.authorization.controller;

import com.terabite.authorization.dto.ApiResponse;
import com.terabite.authorization.dto.AuthRequest;
import com.terabite.authorization.dto.ForgotPasswordRequest;
import com.terabite.authorization.dto.Payload;
import com.terabite.authorization.dto.ResetPasswordRequest;
import com.terabite.authorization.model.Login;
import com.terabite.authorization.repository.LoginRepository;
import com.terabite.authorization.service.CookieMonsterService;
import com.terabite.authorization.service.ForgotPasswordService;
import com.terabite.authorization.service.JwtService;
import com.terabite.authorization.service.LoginService;
import com.terabite.authorization.service.SignupService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(allowCredentials = "true", originPatterns ="*")
@RestController
@RequestMapping("/v1/auth")
public class AuthorizationController {

    private final LoginService loginService;
    private final SignupService signupService;
    private final CookieMonsterService cookieMonsterService;
    private final ForgotPasswordService forgotPasswordService;

    private final JwtService jwtService;

    private final LoginRepository loginRepository;

    private final PasswordEncoder passwordEncoder;

    private final Logger log = LoggerFactory.getLogger(AuthorizationController.class);

    public AuthorizationController(ForgotPasswordService forgotPasswordHelper, LoginService loginService,
            CookieMonsterService cookieMonsterService,
            SignupService signupService,
            JwtService jwtService,
            LoginRepository loginRepository, PasswordEncoder passwordEncoder) {
        this.cookieMonsterService = cookieMonsterService;
        this.forgotPasswordService = forgotPasswordHelper;
        this.loginService = loginService;
        this.signupService = signupService;
        this.jwtService = jwtService;
        this.loginRepository = loginRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> userSignupPost(@RequestBody AuthRequest authRequest, HttpServletResponse response) {

        final Optional<String> token = signupService.signup(authRequest);

        if (token.isPresent()) {
            log.info("Token is present and cookie is being sent");
            Cookie cookie = cookieMonsterService.createAuthorizationCookie(token.get(),
                    60 * 60 * 24 * 7);
            response.addCookie(cookie);
            return ResponseEntity.status(HttpStatus.CREATED).body(new Payload(token.get()));
        }

        return ResponseEntity.status(HttpStatus.CONFLICT).body(new Payload("User already exists"));
    }

    @PostMapping("/validate_credentials")
    public ResponseEntity<?> validateCredentials(@RequestBody AuthRequest authRequest) {
        Optional<Login> login = loginRepository.findByEmail(authRequest.getUsername());
        if (login.isPresent()) {
            log.info("User {} already exists", authRequest.getUsername());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new Payload("User already exists"));
        }
        if (!signupService.verifyPasswordIsStrong(authRequest.getPassword())) {
            log.info("Password {} is not strong enough", authRequest.getPassword());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Payload("Password is not strong enough"));
        }
        log.info("Credentials username: {} and password: {} are valid", authRequest.getUsername(),
                authRequest.getPassword());
        return ResponseEntity.ok(new Payload("Valid"));
    }

    /**
     *
     * @param login
     * @param response
     * @return
     */
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
            Cookie cookie = cookieMonsterService.createAuthorizationCookie(token.get(),
                    60 * 60 * 24 * 7);

            response.addCookie(cookie);
            // we probably should only return ok without the token since it is sent back as
            // a cookie
            return ResponseEntity.ok(new Payload(token.get()));
        }

        log.error("Was unable to login with the given credentials. Invalid login for email: {}, and password: {}",
                login.getEmail(), login.getPassword());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Payload("Invalid login"));

    }

    @PostMapping("/logout")
    public Payload userLogoutPost(HttpServletResponse response, HttpServletRequest request) {

        // README: Since wew ill eventually be using JWT, we wwill need a way to
        // invalidate
        // the tokens on logout. This is so that once logged out on that decide the
        // users are able to
        // log in and get a new token

        Optional<Cookie> tokenCookie = cookieMonsterService.getAuthCookie(request);
        Cookie cookie = cookieMonsterService.createAuthorizationCookie("", 0);
        response.addCookie(cookie);

        return new Payload(String.format("logged out:%s",
                tokenCookie.orElseGet(() -> cookieMonsterService.emptyAuthorizationCookie()).getValue()));
    }

    @PostMapping("/forgot_password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest) {
        return forgotPasswordService.processForgotPassword(forgotPasswordRequest.getEmail());
    }

    @PutMapping("/reset_password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest resetPasswordRequest) {
        return forgotPasswordService.processResetPassword(resetPasswordRequest.getResetToken(),
                resetPasswordRequest.getNewPassword());
    }

    @Deprecated
    @PostMapping("/get_token")
    public ResponseEntity<?> getToken(@RequestBody AuthRequest authRequest) {

        // Login storedLogin = loginRepository.findByEmail(login.getEmail())
        // .orElseThrow(() -> new LoginNotFoundException("Login email not found"));
        //
        // if (passwordEncoder.matches(login.getPassword(), storedLogin.getPassword()))
        // {
        // return jwtService.generateToken(login.getEmail());
        // } else {
        //// throw new LoginNotFoundException("Invalid login");
        // return "Invalid login";
        // }

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

    @PostMapping("/change_role")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> changeRole(@RequestBody Login login) {
        Optional<Login> possibleLogin = loginRepository.findByEmail(login.getEmail());
        if (possibleLogin.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse("Email not found", login));
        }

        Login storedLogin = possibleLogin.get();
        storedLogin.setRoles(login.getRoles());
        loginRepository.save(storedLogin);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponse("Role for " + login.getEmail() + " changed", storedLogin));
    }

    /**
     * TODO: Remove in prod. Fix by ADAPTEDS-114
     */
    @GetMapping("/open_page")
    @PreAuthorize("hasAnyAuthority('ROLE_UNVERIFIED', 'ROLE_ADMIN')")
    public ResponseEntity<?> openPage() {
        return ResponseEntity.ok(new ApiResponse(HttpStatus.OK.toString(), "Reached open page"));
    }

    /**
     * TODO: Remove in prod. Fix by ADAPTEDS-114
     */
    @GetMapping("/restricted_page")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> restrictedPage() {
        return ResponseEntity.ok(new ApiResponse(HttpStatus.OK.toString(), "Reached restricted page"));
    }

}
