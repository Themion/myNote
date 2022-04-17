package themion.my_note.backend.dto.validation;

import java.text.MessageFormat;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import themion.my_note.backend.repository.UserRepository;

@Component
@AllArgsConstructor
public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {

    private final UserRepository repo;

    @Override
    public void initialize(UniqueUsername constraintAnnotation) {
    }

    @Override
    public boolean isValid(String username, ConstraintValidatorContext context) {

        boolean result = repo.read(username).isPresent();

        if (result) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                MessageFormat.format("해당 사용자 이름이 이미 존재합니다: {0}", username)
            ).addConstraintViolation();
        }

        return !result;
    }
    
}
