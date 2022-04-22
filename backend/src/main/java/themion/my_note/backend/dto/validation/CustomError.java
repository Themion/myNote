package themion.my_note.backend.dto.validation;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class CustomError {
    public static final String 
        sizeMsg = "6자 이상 30자 이하여야 합니다. ", 
        patternMsg = "알파벳 대소문자와 숫자, 밑줄만 사용 가능합니다. ",
        notBlankMsg = "필수 항목입니다. ",
        duplicateUsernameMsg = "이미 존재하는 사용자 이름입니다.",
        wrongPasswordMsg = "잘못된 비밀번호입니다.",
        wrongUsernameMsg = "존재하지 않는 사용자 이름입니다: ",
        wrongSessionMsg = "잘못된 세션입니다.",
        memoNotBelongToUserMsg = "사용자가 해당 메모를 소유하지 않습니다.";

    public static String wrongUsername(String username) {
        return CustomError.wrongUsernameMsg + username;
    }

    public static UsernameNotFoundException noUsername(String username) {
        return new UsernameNotFoundException(wrongUsernameMsg + username);
    }
}
