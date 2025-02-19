package com.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.domain.Person;

@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 4; // 4 horas

    public String generateToken(Person user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer("auth-api")
                    .withSubject(user.getEmail())
                    .withClaim("role", user.getRole().name()) // Adicionando a role como uma claim
                    .withExpiresAt(generateExpirationDate())
                    .sign(algorithm);
        } catch (JWTCreationException e) {
            throw new RuntimeException("Erro ao gerar token", e);
        }
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("auth-api")
                    .build()
                    .verify(token)
                    .getSubject(); // Retorna o email do usuário (subject) se o token for válido
        } catch (JWTVerificationException e) {
            return null; // Retorna null em caso de erro de verificação
        }
    }

    private Date generateExpirationDate() {
        return Date.from(LocalDateTime.now().plusHours(4).toInstant(ZoneOffset.of("-03:00")));
    }
}

