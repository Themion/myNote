package themion.my_note.backend.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import themion.my_note.backend.domain.Member;
import themion.my_note.backend.service.MemberService;

@RestController
@RequestMapping(value = "/member")
public class MemberControllerImpl implements MemberController {

    private final String regex = "[a-zA-Z0-9|_]*";
    private final MemberService service;

    @Autowired
    public MemberControllerImpl(MemberService memberService) {
        this.service = memberService;
    }

    @Override
    @RequestMapping(value = "", method = RequestMethod.POST)
    public Map<String, Boolean> signUp(
        @RequestParam("username") String username,
        @RequestParam("password") String password,
        @RequestParam("nickname") String nickname
    ) {
        Map<String, Boolean> ret = new HashMap<String, Boolean>();

        ret.put("usernameMatch", username.matches(regex));
        ret.put("passwordMatch", password.matches(regex));
        ret.put("nicknameMatch", nickname.matches(regex));

        ret.put("isUsernamePresent", service.get(username).isPresent());
        ret.put("passwordLength", password.length() >= 6 && password.length() <= 30);

        
        for (String key : ret.keySet()) if (!ret.get(key)) {
            ret.put("ok", false);
            return ret;
        }
        
        service.join(new Member(username, password, nickname));
        ret.put("ok", true);
        return ret;
    }

    @Override
    @RequestMapping(value = "", method = RequestMethod.GET)
    public Optional<Member> memberInfo(String username) {
        return service.get(username);
    }

    @Override
    @RequestMapping(value = "/p", method = RequestMethod.PUT)
    public void changePassword(String username, String password) {
        if (password.matches(regex)) service.changePassword(username, password);
    }

    @Override
    @RequestMapping(value = "/n", method = RequestMethod.PUT)
    public void changeNickname(String username, String nickname) {
        if (nickname.matches(regex)) service.changeNickname(username, nickname);
    }

    @Override
    @RequestMapping(value = "", method = RequestMethod.PUT)
    public void changeInfo(String username, String password, String nickname) {
        this.changePassword(username, password);
        this.changeNickname(username, nickname);
    }

    @Override
    @RequestMapping(value = "", method = RequestMethod.DELETE)
    public void deleteMember(String username) {
        service.leave(username);
    }
    
}
