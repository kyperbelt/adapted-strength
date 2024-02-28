package com.terabite.authorization.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.terabite.GlobalConfiguration;
import com.terabite.authorization.dto.ApiResponse;
import com.terabite.authorization.log.JwtValidationException;
import com.terabite.authorization.service.CookieMonsterService;
import com.terabite.authorization.service.JwtService;
import com.terabite.authorization.service.LoginService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    
    @Qualifier(GlobalConfiguration.BEAN_NAME_AUTH_COOKIE_NAME)
    @Autowired
    private String authCookieName;

    @Autowired
    private JwtService jwtService;

    @Lazy
    @Autowired
    private LoginService loginService;

    @Autowired
    private CookieMonsterService cookieMonsterService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // String authHeader = request.getHeader("Authorization");
        Optional<String> token = Optional.empty();
        Optional<String> email = Optional.empty();

        // if (authHeader != null && authHeader.startsWith("Bearer ")) {
        //     token = authHeader.substring(7);
        //     try {
        //         email = jwtService.extractUsername(token);
        //     } catch (JwtValidationException e) {
        //         raiseException(request, response, token);
        //         return;
        //     }
        // }
        token = cookieMonsterService.getAuthCookie(request).map(Cookie::getValue); 
        if (token.isPresent()) {
            try {
                email = jwtService.extractUsername(token.get());
            } catch (JwtValidationException e) {
                raiseException(request, response, token.get());
                return;
            }
        }

        if (email.isPresent() && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = loginService.loadUserByUsername(email.get());
            if (jwtService.validateToken(token.get(), userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }

    /**
     * Filters operate at a different plane of existence from the rest of backend, so they need their own exception handling.
     * Also does something with converting objects into json.
     * <p>
     * <a href="https://stackoverflow.com/questions/30335157/make-simple-servlet-filter-work-with-controlleradvice">Stackoverflow Post</a>
     *
     * @param request  Incoming request
     * @param response Outgoing response
     * @param token    JWT
     * @throws IOException from raw byte writing into response body
     */
    private void raiseException(HttpServletRequest request, HttpServletResponse response, String token) throws IOException {
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        ApiResponse apiResponse = new ApiResponse("Invalid token provided", token);
        byte[] body = new ObjectMapper().writeValueAsBytes(apiResponse);
        response.getOutputStream().write(body);
    }


}
