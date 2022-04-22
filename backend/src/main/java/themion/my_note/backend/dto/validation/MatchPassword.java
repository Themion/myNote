package themion.my_note.backend.dto.validation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.Payload;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import themion.my_note.backend.domain.User;
import themion.my_note.backend.security.PasswordEncoder;
import themion.my_note.backend.service.UserService;

@Constraint(validatedBy = MatchPasswordValidator.class)
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface MatchPassword {
    String message() default CustomError.wrongPasswordMsg;
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

@Component
@AllArgsConstructor
class MatchPasswordValidator implements ConstraintValidator<MatchPassword, String> {

    private final UserService service;
    private final PasswordEncoder encoder;

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {

        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();

        if (authentication == null) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                CustomError.wrongSessionMsg
            ).addConstraintViolation();

            return false;
        }

        String username = (String) authentication.getPrincipal();
        User user = service.get(username).orElseGet(() -> {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                CustomError.wrongUsername(username)
            ).addConstraintViolation();

            return User.builder().id(-1L).build();
        });

        if (!encoder.matches(password, user.getPassword())) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                context.getDefaultConstraintMessageTemplate()
            ).addConstraintViolation();

            return false;
        }

        return true;
    }

}
