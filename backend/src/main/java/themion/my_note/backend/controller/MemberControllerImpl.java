package themion.my_note.backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import themion.my_note.backend.domain.Member;
import themion.my_note.backend.service.MemberService;

@RestController
// @RequestMapping(value = "/member")
public class MemberControllerImpl implements MemberController {

    private final String match = "[a-zA-Z0-9|_]*";
    private final MemberService service;

    @Autowired
    public MemberControllerImpl(MemberService memberService) {
        this.service = memberService;
    }

    @Override
    @RequestMapping(value = "/member", method = RequestMethod.POST)
    public String signUp(
        @RequestParam("username") String username,
        @RequestParam("password") String password,
        @RequestParam("nickname") String nickname
    ) {
        if (!username.matches(match)) return "username contains wierd character";
        if (!password.matches(match)) return "password contains wierd character";
        if (!nickname.matches(match)) return "nickname contains wierd character";

        if (service.get(username).isPresent()) return "username alerady exists";
        if (password.length() < 6 || password.length() > 30) return "length of password must be 6 to 30";

        service.join(new Member(username, password, nickname));

        return "";
    }

    @Override
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public Optional<Member> memberInfo(String username) {
        return service.get(username);
    }

    @Override
    @RequestMapping(value = "/p", method = RequestMethod.PUT)
    public void changePassword(String username, String password) {
        service.changePassword(username, password);
    }

    @Override
    @RequestMapping(value = "/n", method = RequestMethod.PUT)
    public void changeNickname(String username, String nickname) {
        service.changeNickname(username, nickname);
    }

    @Override
    @RequestMapping(value = "/", method = RequestMethod.PUT)
    public void changeInfo(String username, String password, String nickname) {
        if (password.matches(match)) service.changePassword(username, password);
        if (nickname.matches(match)) service.changeNickname(username, nickname);
    }

    @Override
    @RequestMapping(value = "/", method = RequestMethod.DELETE)
    public void deleteMember(String username) {
        service.leave(username);
    }
    
}
