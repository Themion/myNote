package themion.my_note.backend.dto.validation;

import org.springframework.security.core.AuthenticationException;

public class UsernameAlreadyExistsException extends AuthenticationException {

    public UsernameAlreadyExistsException(String msg) {
        super(msg);
    }
    
}
