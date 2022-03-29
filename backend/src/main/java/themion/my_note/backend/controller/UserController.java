package themion.my_note.backend.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import themion.my_note.backend.domain.User;
import themion.my_note.backend.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

    private final String regex = "[a-zA-Z0-9|_]*";
    private final UserService service;

    @Autowired
    public UserController(UserService userService) {
        this.service = userService;
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public Map<String, String> signUp(@ModelAttribute User user) {
        Map<String, String> ret = new HashMap<String, String>();

        if (user.getNickname().equals(""))
            user.setNickname(user.getUsername());

        String  username = user.getUsername(),
                password = user.getPassword(),
                nickname = user.getNickname();
        
        // ---------- 수정 필요 ----------

        // 사용할지도 모르는 값은 null을 제거
        ret.put("username", "");
        ret.put("password", "");
        ret.put("nickname", "");

        // username, password, nickname이 정규식을 따르는지 확인
        if (!username.matches(regex)) 
            ret.put("username", ret.get("username") + "알파벳 대소문자와 숫자, 밑줄만 사용 가능합니다. ");
        if (!password.matches(regex)) 
            ret.put("password", ret.get("password") + "알파벳 대소문자와 숫자, 밑줄만 사용 가능합니다. ");
        if (!nickname.matches(regex)) 
            ret.put("nickname", ret.get("nickname") + "알파벳 대소문자와 숫자, 밑줄만 사용 가능합니다. ");

        // 같은 username을 갖는 회원이 존재하는지 확인
        service.get(username).ifPresent(m -> {
            ret.put("username", ret.get("username") + "이미 존재하는 회원입니다. ");
        });

        // 비밀번호의 길이가 적절한지 확인
        if (password.length() < 6 && password.length() > 30)
            ret.put("password", ret.get("password") + "6자 이상 30자 이하여야 합니다. ");
        
        // ret에서 빈 문자열이 아닌 값을 발견했다면
        for (String key : ret.keySet()) if (ret.get(key) != "") {
            // ret에 key로 ok를 갖는 non-null 값을 넣고 return
            ret.put("ok", "no");
            return ret;
        }
        // ---------- 수정 필요 ----------
        
        // 받은 user에 문제가 없다면 user를 join
        service.join(user);

        // return하여 join을 종료
        return ret;
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public Optional<User> userInfo(String username) {
        return service.get(username);
    }

    @RequestMapping(value = "/p", method = RequestMethod.PUT)
    public void changePassword(String username, String password) {
        if (password.matches(regex)) service.changePassword(username, password);
    }

    @RequestMapping(value = "/n", method = RequestMethod.PUT)
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
