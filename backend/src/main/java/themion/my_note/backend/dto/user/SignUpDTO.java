package themion.my_note.backend.dto.user;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import themion.my_note.backend.dto.validation.ErrorMsg;
import themion.my_note.backend.dto.validation.UniqueUsername;
import themion.my_note.backend.dto.validation.ValidationUtils;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class SignUpDTO {
    @NotBlank(message = ErrorMsg.notBlankMsg)
    @Size(min = 6, max = 30, message = ErrorMsg.sizeMsg)
    @Pattern(regexp = ValidationUtils.REGEXP, message = ErrorMsg.patternMsg)
    @UniqueUsername
    private String username;

    @NotBlank(message = ErrorMsg.notBlankMsg)
    @Size(min = 6, max = 30, message = ErrorMsg.sizeMsg)
    @Pattern(regexp = ValidationUtils.REGEXP, message = ErrorMsg.patternMsg)
    private String password;

    @NotBlank(message = ErrorMsg.notBlankMsg)
    @Size(min = 6, max = 30, message = ErrorMsg.sizeMsg)
    @Pattern(regexp = ValidationUtils.REGEXP, message = ErrorMsg.patternMsg)
    private String password_check;

    @Size(min = 6, max = 30, message = ErrorMsg.sizeMsg)
    @Pattern(regexp = ValidationUtils.REGEXP, message = ErrorMsg.patternMsg)
    private String nickname;
}
