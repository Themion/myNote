package themion.my_note.backend.security.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import themion.my_note.backend.domain.User;
import themion.my_note.backend.security.SecurityUtils;
import themion.my_note.backend.service.UserService;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
    
    private final UserService userService;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserService userService) {
        super(authenticationManager);
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        // Read the Authorization header, where the JWT token should be
        String header = request.getHeader(JwtUtils.HEADER);

        // If header is present, try get user principal from database and perform authorization
        if (!request.getServletPath().equals("/session") && header != null && header.startsWith(JwtUtils.PREFIX)) {
            Authentication auth = getUsernamePasswordAuthentication(header, response);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        // Continue filter execution
        chain.doFilter(request, response);
    }

    private Authentication getUsernamePasswordAuthentication(String header, HttpServletResponse response) {
        Authentication auth = null;
        try {
            String username = JwtUtils.getUsernameFromHeader(header);
            User user = userService.get(username);

            auth = new UsernamePasswordAuthenticationToken(username, null, user.getAuthorities());
        } catch (Exception e) {
            SecurityUtils.setError(response, e);
        }

        return auth;
    }

}
