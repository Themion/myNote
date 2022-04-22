package themion.my_note.backend.security;

import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import themion.my_note.backend.domain.Memo;
import themion.my_note.backend.domain.User;
import themion.my_note.backend.service.MemoService;
import themion.my_note.backend.service.UserService;

@Component
@AllArgsConstructor
public class SecurityUtils {
    
    private final UserService userService;
    private final MemoService memoService;

    public boolean ifUserHasMemo(Authentication auth, Long id) {
        String username = auth.getName();
        User user = userService.get(username);
        Optional<Memo> memo = memoService.read(id);
        return memo.isPresent() && memo.get().getUserid().equals(user.getId());
    }

}
