package themion.my_note.backend.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import themion.my_note.backend.domain.User;
import themion.my_note.backend.dto.LogInDTO;
import themion.my_note.backend.service.UserService;

@RestController
@RequestMapping("/session")
public class SessionController {

    private final UserService service;

    @Autowired
    public SessionController(UserService userService) {
        this.service = userService;
    }

    public Map<String, String> logIn(@RequestBody LogInDTO form) {
        Map<String, String> ret = new HashMap<String, String>();
        
        String  username = form.getUsername(),
                password = form.getPassword();

        ret.put("username", "");
        ret.put("password", "");
        
        // ---------- 수정 필요 ----------

        // username, password, nickname이 정규식을 따르는지 확인
        Optional<User> result = service.get(username);

        if (result.isEmpty()) {
            ret.put("username", "유효하지 않은 username입니다.");
            ret.put("ok", "no");
            return ret;
        } else if (!result.get().getPassword().equals(password)) {
            ret.put("password", "password가 일치하지 않습니다.");
            ret.put("ok", "no");
            return ret;
        }
        // ---------- 수정 필요 ----------

        // return하여 join을 종료
        return ret;
    }
    
}
