package themion.my_note.backend.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import themion.my_note.backend.domain.User;
import themion.my_note.backend.dto.DeleteUserDTO;
import themion.my_note.backend.dto.NicknameDTO;
import themion.my_note.backend.dto.PasswordDTO;
import themion.my_note.backend.dto.SignUpDTO;
import themion.my_note.backend.service.UserService;

@RestController
@AllArgsConstructor
@RequestMapping("user")
public class UserController {

    private final UserService service;
    private final PasswordEncoder encoder;

    @RequestMapping(value = "", method = RequestMethod.POST)
    public void signUp(@RequestBody @Validated SignUpDTO dto) {

        if (dto.getNickname() == null) dto.setNickname(dto.getUsername());
        
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

    @RequestMapping(value = "nickname", method = RequestMethod.PUT)
    public void changeNickname(
        @RequestBody @Validated NicknameDTO dto,
        @AuthenticationPrincipal String username
    ) {
        service.changeNickname(username, dto.getNickname());
    }

    @RequestMapping(value = "", method = RequestMethod.DELETE)
    public void deleteUser(
        @RequestBody @Validated DeleteUserDTO dto,
        @AuthenticationPrincipal String username
    ) {
        service.leave(username);
    }
    
}
