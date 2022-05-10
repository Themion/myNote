package themion.my_note.backend.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import themion.my_note.backend.domain.Memo;
import themion.my_note.backend.domain.User;
import themion.my_note.backend.dto.memo.WriteDTO;
import themion.my_note.backend.service.MemoService;
import themion.my_note.backend.service.UserService;

@RequestMapping("memo")
@RestController
@AllArgsConstructor
public class MemoController {

    private final UserService userService;
    private final MemoService memoService;

    private Long getUserId(String username) {
        User user = userService.get(username);
        return user.getId();
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public Memo write(
        @RequestBody WriteDTO writeDTO,
        @AuthenticationPrincipal String username
    ) {
        return memoService.write(
            Memo.builder()
                .userid(getUserId(username))
                .title(writeDTO.getTitle())
                .memo(writeDTO.getMemo())
                .build()
        );
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<Memo> getMemoList(
        @AuthenticationPrincipal String username
    ) {
        return memoService.get(getUserId(username));
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public Memo getMemo(
        @PathVariable Long id,
        @AuthenticationPrincipal String username
    ) {
        Memo memo = memoService.read(id).orElse(
            Memo.builder()
                .userid(getUserId(username))
                .id(id)
                .build()
        );
        
        return memo;
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public Memo edit(
        @PathVariable Long id,
        @RequestBody WriteDTO writeDTO,
        @AuthenticationPrincipal String username
    ) {
        return memoService.write(
            Memo.builder()
            .id(id)
            .userid(getUserId(username))
            .title(writeDTO.getTitle())
            .memo(writeDTO.getMemo())
            .build()
        );
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id) {
        memoService.remove(id);
    }
}
