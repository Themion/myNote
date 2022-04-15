package themion.my_note.backend.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import themion.my_note.backend.domain.User;
import themion.my_note.backend.dto.SignUpDTO;
import themion.my_note.backend.security.UsernameAlreadyExistsException;
import themion.my_note.backend.service.UserService;

@RestController
@RequiredArgsConstructor
@RequestMapping("user")
public class UserController {

    private final String regex = "[a-zA-Z0-9|_]*";
    @NonNull
    private final UserService service;
    @NonNull
    private final PasswordEncoder encoder;

    @RequestMapping(value = "", method = RequestMethod.POST)
    public Map<String, String> signUp(@RequestBody @Validated SignUpDTO form) throws Exception {
        Map<String, String> ret = new HashMap<String, String>();

        if (form.getUsername() == null) form.setNickname(form.getUsername());

        String username = form.getUsername();
        
        // ---------- 수정 필요 ----------

        // 사용할지도 모르는 값은 null을 제거
        ret.put("username", "");
        ret.put("password", "");
        ret.put("password_check", "");
        ret.put("nickname", "");

        Optional.ofNullable(service.get(username)).ifPresentOrElse(
            // 해당 username이 이미 존재한다면 exception 발생
            (user) -> { throw new UsernameAlreadyExistsException("Username " + username + " alerady exists."); }, 
            // 그렇지 않다면 해당하는 user를 만들어서 join
            () -> service.join(User.builder()
                .username(username)
                .password(encoder.encode(form.getPassword()))
                .nickname(form.getNickname())
                .build()
        ));

        // return하여 join을 종료
        return ret;
        
        // ---------- 수정 필요 ----------
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public User userInfo(String username) {
        return service.get(username);
    }

    @RequestMapping(value = "p", method = RequestMethod.PUT)
    public void changePassword(String username, String password) {
        if (password.matches(regex)) service.changePassword(username, password);
    }

    @RequestMapping(value = "n", method = RequestMethod.PUT)
    public void changeNickname(String username, String nickname) {
        if (nickname.matches(regex)) service.changeNickname(username, nickname);
    }

    @RequestMapping(value = "", method = RequestMethod.PUT)
    public void changeInfo(String username, String password, String nickname) {
        this.changePassword(username, password);
        this.changeNickname(username, nickname);
    }

    @RequestMapping(value = "", method = RequestMethod.DELETE)
    public void deleteUser(String username) {
        service.leave(username);
    }
    
}
