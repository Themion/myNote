package themion.my_note.backend.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import themion.my_note.backend.domain.User;
import themion.my_note.backend.dto.user.DeleteDTO;
import themion.my_note.backend.dto.user.NicknameDTO;
import themion.my_note.backend.dto.user.PasswordDTO;
import themion.my_note.backend.dto.user.SignUpDTO;
import themion.my_note.backend.service.UserService;

@RequestMapping("user")
@RestController
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @RequestMapping(value = "", method = RequestMethod.POST)
    public void signUp(@RequestBody @Validated SignUpDTO dto) {

        if (dto.getNickname() == null) dto.setNickname(dto.getUsername());
        
        userService.join(User.builder()
            .username(dto.getUsername())
            .password(dto.getPassword())
            .nickname(dto.getNickname())
            .build()
        );
    }

    @RequestMapping(value = "password", method = RequestMethod.PUT)
    public void changePassword(
        @RequestBody @Validated PasswordDTO dto,
        @AuthenticationPrincipal String username
    ) {
        userService.changePassword(username, dto.getPassword());
    }

    @RequestMapping(value = "nickname", method = RequestMethod.PUT)
    public void changeNickname(
        @RequestBody @Validated NicknameDTO dto,
        @AuthenticationPrincipal String username
    ) {
        userService.changeNickname(username, dto.getNickname());
    }

    @RequestMapping(value = "", method = RequestMethod.DELETE)
    public void deleteUser(
        @RequestBody @Validated DeleteDTO dto,
        @AuthenticationPrincipal String username
    ) {
        userService.leave(username);
    }
    
}
