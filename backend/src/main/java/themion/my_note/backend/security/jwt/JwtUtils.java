package themion.my_note.backend.security.jwt;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.auth0.jwt.algorithms.Algorithm;

@Component
public class JwtUtils {
    public static Long TOKEN_LIFE_SPAN;
    public static String HEADER = "Authorization";
    public static String PREFIX = "Bearer ";
    private static String SECRET;

    public static Algorithm HMAC512() {
        return com.auth0.jwt.algorithms.Algorithm.HMAC512(JwtUtils.SECRET);
    }

    @Value("${jwt.token-life-span}")
    public void setTokenLifeSpan(Long tokenLifeSpan) {
        JwtUtils.TOKEN_LIFE_SPAN = tokenLifeSpan;
    }

    @Value("${jwt.secret}")
    public void setSecret(String secret) {
        JwtUtils.SECRET = secret;
    }
}
