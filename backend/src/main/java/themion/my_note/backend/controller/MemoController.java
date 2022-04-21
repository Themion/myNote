package themion.my_note.backend.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import themion.my_note.backend.domain.Memo;
import themion.my_note.backend.domain.User;
import themion.my_note.backend.dto.memo.WriteDTO;
import themion.my_note.backend.dto.validation.CustomError;
import themion.my_note.backend.service.MemoService;
import themion.my_note.backend.service.UserService;

@RequestMapping("memo")
@RestController
@AllArgsConstructor
public class MemoController {

    private final UserService userService;
    private final MemoService memoService;

    private Long getUserId(String username) {
        User user = userService.get(username).orElseThrow(() -> CustomError.noUsername(username));
        return user.getId();
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public void write(
        @RequestBody WriteDTO writeDTO,
        @AuthenticationPrincipal String username
    ) {
        memoService.write(
            Memo.builder()
                .userid(getUserId(username))
                .title(writeDTO.getTitle())
                .memo(writeDTO.getMemo())
                .build()
        );
    }
}
