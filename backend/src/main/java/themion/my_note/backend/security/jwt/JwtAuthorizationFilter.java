package themion.my_note.backend.security.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.auth0.jwt.JWT;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import themion.my_note.backend.domain.User;
import themion.my_note.backend.repository.UserRepository;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
    
    private final UserRepository repo;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository) {
        super(authenticationManager);
        this.repo = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        // Read the Authorization header, where the JWT token should be
        String header = request.getHeader(JwtUtils.HEADER);

        // If header is present, try get user principal from database and perform authorization
        if (header != null && header.startsWith(JwtUtils.PREFIX)) {
            Authentication auth = getUsernamePasswordAuthentication(request);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        // Continue filter execution
        chain.doFilter(request, response);
    }

    private Authentication getUsernamePasswordAuthentication(HttpServletRequest request) throws UsernameNotFoundException {

        // Get token from header
        String token = request.getHeader(JwtUtils.HEADER).replace(JwtUtils.PREFIX, "");

        if (token != null) {
            // parse the token and validate it
            String username = JWT.require(JwtUtils.HMAC512())
                .build()
                .verify(token)
                .getSubject();

            // Search in the DB if we find the user by token subject (username)
            // If so, then get user details and create spring auth token using username, pass, authorities/roles
            if (username != null) {
                User user = repo.read(username).orElseThrow(() -> new UsernameNotFoundException("Username " + username + "not found"));
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(username,null, user.getAuthorities());

                return auth;
            }
        }
        return null;
    }

}
