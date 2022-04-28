package themion.my_note.backend.security;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import themion.my_note.backend.domain.User;
import themion.my_note.backend.service.MemoService;
import themion.my_note.backend.service.UserService;

@Component
@AllArgsConstructor
public class SecurityUtils {
    
    private static UserService userService;
    private static MemoService memoService;

    public boolean ifUserHasMemo(Authentication auth, Long id) {
        String username = auth.getName();
        User user = userService.get(username);
        return memoService.isBelongTo(user.getId(), id);
    }

    public static void setError(HttpServletResponse response, Exception e) {
        // show error on header
        response.setHeader("error", e.getMessage());
        response.setStatus(HttpStatus.FORBIDDEN.value());
                
        // set error on response
        Map<String, String> error = new HashMap<>();
        error.put("error-message", e.getMessage());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        try {
            new ObjectMapper().writeValue(response.getOutputStream(), error);
        } catch (IOException e1) {
            e1.printStackTrace();
        }
    }

}
