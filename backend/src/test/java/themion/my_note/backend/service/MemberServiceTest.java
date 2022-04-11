package themion.my_note.backend.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

import themion.my_note.backend.domain.User;

import static org.assertj.core.api.Assertions.*;

import java.util.Optional;

@SpringBootTest
@Transactional
public class MemberServiceTest {

    @Autowired UserService service;

    // 만들기 귀찮았음
    // joinTest -> getTest -> changeTest -> leaveTest 순으로 실행해야 함

    String username = "serviceTestUsername";
    User m = new User(username, "password");

    // @Commit으로 DB에 저장되는지 직접 확인
    @Test 
    @Commit
    void joinTest() {
        service.join(m);
    }

    @Test
    void getTest() {
        assertThat(service.get(username)).isNotEmpty();
    }

    @Test
    @Commit
    void changeTest() {
        String pw = "changeTestPassword", nick = "changeTestNickname";
        service.change(username, Optional.ofNullable(pw), Optional.ofNullable(nick));
        User result = service.get(username).get();

        assertThat(result.getPassword()).isEqualTo(pw);
        assertThat(result.getNickname()).isEqualTo(nick);
    }

    @Test
    @Commit
    void leaveTest() {
        assertThat(service.get(username)).isNotEmpty();
        service.leave(username);
        assertThat(service.get(username)).isEmpty();
    }

}
