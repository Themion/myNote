package themion.my_note.backend.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

import themion.my_note.backend.domain.User;
 
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.fail;


@SpringBootTest
@Transactional
public class MemberRepositoryTest {

    @Autowired UserRepository repo;

    // @Commit으로 DB에 저장되는지 직접 확인
    @Test
    @Commit
    public void createTest() {
        String username = "createTestUsername";
        User m1 = new User(username, "createTestPassword"), m2 = new User(username, "");
        
        repo.create(m1);
        try {
            repo.create(m2);
            fail();
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    @Test
    void readTest() {
        // given
        User m = new User("readTestUsername", "readTestPassword");
        
        // when
        repo.create(m);
        
        // then
        assertThat(repo.read(m.getUsername())).isNotEmpty();
        assertThat(repo.read(m.getPassword())).isEmpty();
    }

    @Test
    void updateTest() {
        // given
        String username = "updateTestUsername", 
               passwordBefore = "updateTestPassword",
               passwordAfter = "password",
               nicknameBefore = "updateTestNickname",
               nicknameAfter = "nickname";
        User m = User.builder()
            .username(username)
            .password(passwordBefore)
            .nickname(nicknameBefore)
            .build(), m_;
        
        
        // when
        repo.create(m);
        repo.updatePassword(username, passwordAfter);
        repo.updateNickname(username, nicknameAfter);
        m_ = repo.read(username).get();

        // then
        assertThat(m_.getPassword()).isNotEqualTo(passwordBefore);
        assertThat(m_.getPassword()).isEqualTo(passwordAfter);
        assertThat(m_.getNickname()).isNotEqualTo(nicknameBefore);
        assertThat(m_.getNickname()).isEqualTo(nicknameAfter);
    }

    @Test
    void deleteTest() {
        // given
        String username = "deleteTestUsername", password = "deleteTestPassword";
        User m = new User(username, password);

        // when
        repo.create(m);

        // then
        assertThat(repo.read(username)).isNotEmpty();

        // when
        repo.delete(username);

        // then
        assertThat(repo.read(username)).isEmpty();
        repo.delete(password);
    }
}
