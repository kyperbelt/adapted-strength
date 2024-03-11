package com.terabite.authorization.service;

import com.terabite.GlobalConfiguration;
import com.terabite.authorization.log.JwtValidationException;
import com.terabite.common.model.LoginDetails;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.InvalidKeyException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;

@Service
public class JwtService {

    // In milliseconds | probably should be in config FIXME
    private static final long DEFAULT_JWT_EXPIRATION = 1000 * 60 * 60 * 24;

    private static Logger log = LoggerFactory.getLogger(JwtService.class);
    private final Key SECRET;
    private final long expiration;

    public JwtService(@Qualifier(GlobalConfiguration.BEAN_JWT_SECRET) final String jwtSecret) {
        this(jwtSecret, DEFAULT_JWT_EXPIRATION);
    }

    public JwtService(@Qualifier(GlobalConfiguration.BEAN_JWT_SECRET) final String jwtSecret,
            final long expiration) {
        this.SECRET = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        this.expiration = expiration;
    }

    /**
     * Generate a jwt token based on user login details 
     */
    public String generateToken(LoginDetails loginDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", loginDetails.getRoles());
        return createToken(claims, loginDetails.getUsername());
    }

    @Deprecated 
    /**
     * Generates a jwt token with only the username and no valid claims.
     */
    public String generateToken(String userName) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userName);
    }

    private String createToken(Map<String, Object> claims, String userName) {

        try {
            return Jwts.builder()
                    .setClaims(claims)
                    .setSubject(userName)
                    .setIssuedAt(new Date(System.currentTimeMillis()))
                    .setExpiration(new Date(System.currentTimeMillis() + expiration)) 
                    .signWith(getSignKey(), SignatureAlgorithm.HS512).compact();
        } catch (InvalidKeyException e) {
            throw new RuntimeException(e);
        }
    }

    private Key getSignKey() {
        return SECRET;
    }

    public Optional<String> extractUsername(String token) {
        try {
            return Optional.ofNullable(extractClaim(token, Claims::getSubject));
        } catch (JwtValidationException e) {
            return Optional.empty();
        }
    }

    @SuppressWarnings("unchecked")
    public List<String> extractRoles(String token) {
        final Claims claims = extractAllClaims(token);
        if (!claims.containsKey("roles")) {
            log.error("No roles found in token");
            return new ArrayList<String>();
        }
        return claims.get("roles", List.class);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public boolean hasRole(final String token, final String role) {
        final Optional<String> username = extractUsername(token);
        if (username.isEmpty()) {
            log.error("hasRole: No username found in token");
            return false;
        }

        final Claims claims = extractAllClaims(token);

        if (!claims.containsKey("roles")) {
            log.error("hasRole: No roles found in token for user: %s", username.get());
            return false;
        }

        @SuppressWarnings("unchecked")
        final List<String> roles = new ArrayList<String>(claims.get("roles", ArrayList.class));
        for (String r : roles) {
            if (r.equals(role)) {
                return true;
            }
        }

        log.warn("hasRole: User <%s> does not have role: %s", username.get(), role);
        return false;

    }

    private Claims extractAllClaims(String token) {
        try {
            return Jwts
                    .parserBuilder()
                    .setSigningKey(getSignKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | SignatureException
                | IllegalArgumentException e) {
            log.error(String.format("Error parsing token: %s", e.getMessage()));
            e.printStackTrace();
            // Don't think this ever gets thrown - see JwtAuthFilter
            throw new JwtValidationException(e.getMessage());
        }
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // TODO: Figure out if spring gets used here (UserDetails) or manual
    // implementation
    public boolean validateToken(String token, UserDetails loginDetails) {
        final String username = extractUsername(token).orElse(null);
        return (loginDetails.getUsername().equals(username) && !isTokenExpired(token)); // TODO: manual invalidation
                                                                                        // check here
    }

    // // Temp "validation" of jwt
    // // * Users should never lose jwt, so jwt is always for their account
    // // * Jwt cannot simply invalidated, so only check for expiration
    // public Boolean isValid(String token) {
    // return isTokenExpired(token);
    // }
}
