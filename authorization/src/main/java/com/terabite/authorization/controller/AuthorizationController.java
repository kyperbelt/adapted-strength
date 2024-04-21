package com.terabite.authorization.controller;

import com.terabite.authorization.AuthorizationApi;
import com.terabite.authorization.dto.ApiResponse;
import com.terabite.authorization.dto.AuthRequest;
import com.terabite.authorization.dto.ForgotPasswordRequest;
import com.terabite.authorization.dto.ResetPasswordRequest;
import com.terabite.authorization.model.Login;
import com.terabite.authorization.repository.LoginRepository;
import com.terabite.authorization.service.ForgotPasswordService;
import com.terabite.authorization.service.JwtService;
import com.terabite.authorization.service.LoginService;
import com.terabite.authorization.service.SignupService;
import com.terabite.common.dto.Payload;
import com.terabite.common.dto.PayloadType;
import com.terabite.common.model.LoginDetails;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/v1/auth")
public class AuthorizationController {

    private final LoginService loginService;
    private final SignupService signupService;
    private final ForgotPasswordService forgotPasswordService;

    private final JwtService jwtService;

    private final LoginRepository loginRepository;

    private final PasswordEncoder passwordEncoder;

    private final Logger log = LoggerFactory.getLogger(AuthorizationController.class);
    private final AuthorizationApi authorizationApi;

    public AuthorizationController(ForgotPasswordService forgotPasswordService, LoginService loginService,
                                   SignupService signupService,
                                   JwtService jwtService,
                                   LoginRepository loginRepository, PasswordEncoder passwordEncoder, AuthorizationApi authorizationApi) {
        this.forgotPasswordService = forgotPasswordService;
        this.loginService = loginService;
        this.signupService = signupService;
        this.jwtService = jwtService;
        this.loginRepository = loginRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorizationApi = authorizationApi;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> userSignupPost(@RequestBody AuthRequest authRequest) {

        final Optional<String> token = signupService.signup(authRequest);

        if (token.isPresent()) {
            log.info("Token is present and cookie is being sent");
            return ResponseEntity.status(HttpStatus.CREATED).body(Payload.of(PayloadType.JWT_TOKEN, token.get()));
        }

        return ResponseEntity.status(HttpStatus.CONFLICT).body(Payload.of("User already exists"));
    }

    @PostMapping("/validate_credentials")
    public ResponseEntity<?> validateCredentials(@RequestBody AuthRequest authRequest) {
        Optional<Login> login = loginRepository.findByEmail(authRequest.getUsername());
        if (login.isPresent()) {
            log.info("User {} already exists", authRequest.getUsername());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Payload.of("User already exists"));
        }
        if (!signupService.verifyPasswordIsStrong(authRequest.getPassword())) {
            log.info("Password {} is not strong enough", authRequest.getPassword());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Payload.of("Password is not strong enough"));
        }
        log.info("Credentials username: {} and password: {} are valid", authRequest.getUsername(),
                authRequest.getPassword());
        return ResponseEntity.ok(Payload.of("Valid"));
    }

    @GetMapping("/has_role/{role}")
    public ResponseEntity<?> hasRole(@AuthenticationPrincipal UserDetails userDetials, @PathVariable String role) {
        LoginDetails loginDetails = (LoginDetails) userDetials;
        if (loginDetails != null && loginDetails.getRoles().contains(role)) {
            return ResponseEntity.ok(new ApiResponse("User has role " + role, "Success"));
        } else {
            if (loginDetails != null) {
                log.info(" User {} does not have role {}", loginDetails.getUsername(), role);
                log.info(" User roles are {}", loginDetails.getRoles());
            } else {
                log.info("User details are null becasue user is not logged in, probably");
            }
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ApiResponse("User does not have role " + role,
                    "Forbidden"));
        }
    }

    /**
     * @param login The JSON Login object provided to the endpoint
     */
    @PostMapping("/login")
    public ResponseEntity<?> userLoginPost(@RequestBody Login login) {

        Optional<String> token = loginService.login(login);

        if (token.isPresent()) {
            log.info("Token was successfully created and it is being sent for user {}", login.getEmail());
            return ResponseEntity.ok(Payload.of(PayloadType.JWT_TOKEN, token.get()));
        }

        log.error("Was unable to login with the given credentials. Invalid login for email: {}, and password: {}",
                login.getEmail(), login.getPassword());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Payload.of("Invalid login"));

    }

    @PostMapping("/logout")
    public Payload userLogoutPost(HttpServletRequest request) {
        // Get Authorization Header
        String authorizationHeader;
        try {
            authorizationHeader = request.getHeader("Authorization");
        } catch (Exception e) {
            log.info("/logout - No Authorization Header Found: " + e.getMessage());
            return Payload.of(PayloadType.MESSAGE, "/logout - No Authorization Header Found: " + e.getMessage());
        }

        // Get token after "Bearer: "
        String token = authorizationHeader.substring(7);

        // Invalidate token
        jwtService.invalidateToken(token);
        log.info("Token blacklist size: {}", jwtService.getTokenBlacklist().size());

//        LoginDetails loginDetails = (LoginDetails) userDetails;
        // Token should be added to a blacklist until it expires
        // This blacklist should be checked in the JwtAuthFilter

        return Payload.of(PayloadType.MESSAGE, "Logout successful");
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

    /**
     * Hit this endpoint with a request containing a bearer token JWT and get a new JWT.
     * Also invalidates the provided, old JWT.
     *
     * @param request The underlying servlet representing an incoming request. Spring Boot automatically supplies this
     */
    @GetMapping("/refresh_token")
    public ResponseEntity<?> refreshToken(HttpServletRequest request) {
        // Grab Authorization Bearer token
        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse("Bad Request", "No Bearer token provided"));
        }

        try {
            String token = header.substring(7); // "Bearer " is 7 chars
            Optional<String> newToken = authorizationApi.refreshToken(token);

            if (newToken.isPresent()) {
                jwtService.invalidateToken(token);
                log.info("Refreshed token - new token: {}", newToken.get());
                return ResponseEntity.ok(new ApiResponse("Refresh Token", newToken));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ApiResponse("Unauthorized", "No token provided"));
            }

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse("Internal Server Error", "Could not refresh token"));
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
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_UNVERIFIED', 'ROLE_ADMIN')")
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
