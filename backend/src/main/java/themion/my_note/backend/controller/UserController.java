package themion.my_note.backend.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import themion.my_note.backend.domain.User;
import themion.my_note.backend.dto.PasswordDTO;
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
    public void signUp(@RequestBody @Validated SignUpDTO dto) {

        if (dto.getNickname() == "") dto.setNickname(dto.getUsername());
        
        service.join(User.builder()
            .username(dto.getUsername())
            .password(encoder.encode(dto.getPassword()))
            .nickname(dto.getNickname())
            .build()
        );
    }

    @RequestMapping(value = "password", method = RequestMethod.PUT)
    public void changePassword(
        @RequestBody @Validated PasswordDTO dto,
        @AuthenticationPrincipal String username
    ) {
        service.changePassword(username, encoder.encode(dto.getPassword()));
    }

    @RequestMapping(value = "n", method = RequestMethod.PUT)
    public void changeNickname(String username, String nickname) {
        if (nickname.matches(regex)) service.changeNickname(username, nickname);
    }

    @RequestMapping(value = "", method = RequestMethod.DELETE)
    public void deleteUser(String username) {
        service.leave(username);
    }
    
}
