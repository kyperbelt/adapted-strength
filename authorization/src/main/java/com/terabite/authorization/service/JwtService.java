package com.terabite.authorization.service;

import com.terabite.authorization.log.JwtValidationException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.InvalidKeyException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtService {
    public static final Key SECRET = Keys.secretKeyFor(SignatureAlgorithm.HS512);

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
                    .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 1)) // Expire in 1 minute for testing
                    .signWith(getSignKey(), SignatureAlgorithm.HS512).compact();
        } catch (InvalidKeyException e) {
            throw new RuntimeException(e);
        }
    }

    private Key getSignKey() {
        return SECRET;
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        try {
            return Jwts
                    .parserBuilder()
                    .setSigningKey(getSignKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | SignatureException |
                 IllegalArgumentException e) {
            // Don't think this ever gets thrown - see JwtAuthFilter
            throw new JwtValidationException(e.getMessage());
        }
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }


    // TODO: Figure out if spring gets used here (UserDetails) or manual implementation
    public Boolean validateToken(String token, UserDetails loginDetails) {
        final String username = extractUsername(token);
        return (username.equals(loginDetails.getUsername()) && !isTokenExpired(token)); // TODO: manual invalidation check here
    }

    // Temp "validation" of jwt
    // * Users should never lose jwt, so jwt is always for their account
    // * Jwt cannot simply invalidated, so only check for expiration
    public Boolean isValid(String token) {
        return isTokenExpired(token);
    }
}
