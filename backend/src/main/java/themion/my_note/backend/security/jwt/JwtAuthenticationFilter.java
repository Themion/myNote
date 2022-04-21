package themion.my_note.backend.security.jwt;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.auth0.jwt.JWT;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.AllArgsConstructor;
import themion.my_note.backend.domain.User;
import themion.my_note.backend.dto.user.LoginDTO;

@AllArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter{
    
    private AuthenticationManager authenticationManager;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        // Get LoginDTO from request using ObjectMapper
        LoginDTO loginDTO = null;

        try {
            loginDTO = new ObjectMapper().readValue(request.getInputStream(), LoginDTO.class);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Create login token using UserDto
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
            loginDTO.getUsername(),
            loginDTO.getPassword(),
            new ArrayList<>()
        );

        // Return authenticated user by authenticating login token
        return authenticationManager.authenticate(token);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        
        // Get UserDetails
        User user = (User) authResult.getPrincipal();

        // Create JWT Token
        String token = JWT.create()
            .withSubject(user.getUsername())
            .withClaim("nickname", user.getNickname())
            .withExpiresAt(new Date(System.currentTimeMillis() + JwtUtils.TOKEN_LIFE_SPAN))
            .sign(JwtUtils.HMAC512());

        // Add token in response
        response.addHeader(JwtUtils.HEADER, JwtUtils.PREFIX + token);
    }

}
