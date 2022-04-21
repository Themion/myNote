package themion.my_note.backend.dto.validation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.Payload;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import themion.my_note.backend.service.UserService;

@Constraint(validatedBy = UniqueUsernameValidator.class)
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueUsername {
    String message() default CustomError.duplicateUsernameMsg;
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

@Component
@AllArgsConstructor
class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {

    private final UserService service;

    @Override
    public boolean isValid(String username, ConstraintValidatorContext context) {

        boolean result = service.get(username).isPresent();

        if (result) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                context.getDefaultConstraintMessageTemplate()
            ).addConstraintViolation();
        }

        return !result;
    }
    
}
