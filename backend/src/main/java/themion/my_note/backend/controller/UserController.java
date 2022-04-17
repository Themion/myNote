package themion.my_note.backend.controller;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
    public void signUp(@RequestBody @Validated SignUpDTO form) {

        if (form.getNickname() == null) form.setNickname(form.getUsername());
        
        service.join(User.builder()
            .username(form.getUsername())
            .password(encoder.encode(form.getPassword()))
            .nickname(form.getNickname())
            .build()
        );
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public User userInfo(String username) {
        return service.get(username).orElseThrow(() -> new UsernameNotFoundException("Username " + username + " not found"));
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
