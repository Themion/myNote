package themion.my_note.backend.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

class ErrorMsg {
    public static final String 
        sizeMsg = "6자 이상 30자 이하여야 합니다. ", 
        patternMsg = "알파벳 대소문자와 숫자, 밑줄만 사용 가능합니다. ",
        notBlankMsg = "필수 항목입니다. ";
}

@AllArgsConstructor
@Data
@NoArgsConstructor
public class SignUpDTO {
    @NotBlank(message = ErrorMsg.notBlankMsg)
    @Size(min = 6, max = 30, message = ErrorMsg.sizeMsg)
    @Pattern(regexp = "^[a-zA-Z0-9]*$", message = ErrorMsg.patternMsg)
    private String username;

    @NotBlank(message = ErrorMsg.notBlankMsg)
    @Size(min = 6, max = 30, message = ErrorMsg.sizeMsg)
    @Pattern(regexp = "^[a-zA-Z0-9]*$", message = ErrorMsg.patternMsg)
    private String password;

    @NotBlank(message = ErrorMsg.notBlankMsg)
    @Size(min = 6, max = 30, message = ErrorMsg.sizeMsg)
    @Pattern(regexp = "^[a-zA-Z0-9]*$", message = ErrorMsg.patternMsg)
    private String password_check;

    @Size(min = 6, max = 30, message = ErrorMsg.sizeMsg)
    @Pattern(regexp = "^[a-zA-Z0-9]*$", message = ErrorMsg.patternMsg)
    private String nickname;
}
