package themion.my_note.backend.dto.validation;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class CustomError {
    public static final String 
        sizeMsg = "6자 이상 30자 이하여야 합니다. ", 
        patternMsg = "알파벳 대소문자와 숫자, 밑줄만 사용 가능합니다. ",
        notBlankMsg = "필수 항목입니다. ",
        duplicateUsernameMsg = "이미 존재하는 사용자 이름입니다.",
        wrongPasswordMsg = "잘못된 비밀번호입니다.";

    public static UsernameNotFoundException noUsername(String username) {
        return new UsernameNotFoundException("Username not found: " + username);
    }
}
