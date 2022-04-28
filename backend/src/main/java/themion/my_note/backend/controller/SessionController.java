package themion.my_note.backend.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import themion.my_note.backend.domain.User;
import themion.my_note.backend.security.SecurityUtils;
import themion.my_note.backend.security.jwt.JwtUtils;
import themion.my_note.backend.service.UserService;

@RequestMapping("session")
@RestController
@AllArgsConstructor
public class SessionController {

    private final UserService userService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public void getAccessTokenFromRefreshToken(HttpServletRequest request, HttpServletResponse response) {
        // Read the Authorization header, where the JWT token should be
        String header = request.getHeader(JwtUtils.HEADER);
        
        // If header is present, try get user principal from database and perform authorization
        if (header != null && header.startsWith(JwtUtils.PREFIX)) try {
            String username = JwtUtils.getUsernameFromHeader(header);
            User user = userService.get(username);

            // Create JWT Tokens
            Map<String, String> tokens = new HashMap<>();
            tokens.put(JwtUtils.ACCESS_TOKEN_HEADER, JwtUtils.getAccessToken(request, user));

            // Add tokens in response
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            new ObjectMapper().writeValue(response.getOutputStream(), tokens);
        } catch (Exception e) {
            SecurityUtils.setError(response, e);
        }
    }
}
