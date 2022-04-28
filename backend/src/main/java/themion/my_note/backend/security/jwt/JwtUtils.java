package themion.my_note.backend.security.jwt;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import themion.my_note.backend.domain.User;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator.Builder;
import com.auth0.jwt.algorithms.Algorithm;

@Component
public class JwtUtils {
    public static Long ACCESS_TOKEN_LIFE_SPAN;
    public static Long REFRESH_TOKEN_LIFE_SPAN;
    public static String HEADER = "Authorization";
    public static String ACCESS_TOKEN_HEADER = "access-token";
    public static String REFRESH_TOKEN_HEADER = "refresh-token";
    public static String PREFIX = "Bearer ";
    private static String SECRET;

    public static Algorithm HMAC512() {
        return com.auth0.jwt.algorithms.Algorithm.HMAC512(JwtUtils.SECRET);
    }

    @Value("${jwt.token-life-span.access}")
    public void setAccessTokenLifeSpan(Long accessTokenLifeSpan) {
        JwtUtils.ACCESS_TOKEN_LIFE_SPAN = accessTokenLifeSpan;
    }

    @Value("${jwt.token-life-span.refresh}")
    public void setRefreshTokenLifeSpan(Long refreshTokenLifeSpan) {
        JwtUtils.REFRESH_TOKEN_LIFE_SPAN = refreshTokenLifeSpan;
    }

    @Value("${jwt.secret}")
    public void setSecret(String secret) {
        JwtUtils.SECRET = secret;
    }

    public static String getUsernameFromHeader(String header) {
        return JWT.require(JwtUtils.HMAC512())
            .build()
            .verify(header.replace(JwtUtils.PREFIX, ""))
            .getSubject();
    }

    private static Builder getJwtBuilder(HttpServletRequest request, User user) {
        return JWT.create()
            .withSubject(user.getUsername())
            .withIssuer(request.getRequestURI().toString())
            .withIssuedAt(new Date(System.currentTimeMillis()));
    }

    public static String getAccessToken(HttpServletRequest request, User user) {
        return getJwtBuilder(request, user)
            .withClaim("nickname", user.getNickname())
            .withExpiresAt(new Date(System.currentTimeMillis() + JwtUtils.ACCESS_TOKEN_LIFE_SPAN))
            .sign(JwtUtils.HMAC512());
    }

    public static String getRefreshToken(HttpServletRequest request, User user) {
        return getJwtBuilder(request, user)
            .withExpiresAt(new Date(System.currentTimeMillis() + JwtUtils.REFRESH_TOKEN_LIFE_SPAN))
            .sign(JwtUtils.HMAC512());
    }
}
