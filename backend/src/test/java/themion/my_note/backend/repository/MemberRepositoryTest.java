package themion.my_note.backend.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import themion.my_note.backend.domain.Member;
 
import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
public class MemberRepositoryTest {

    @Autowired MemberRepository repo;

    // @Commit으로 DB에 저장되는지 직접 확인
    /* @Test
    @org.springframework.test.annotation.Commit
    public void createTest() {
        repo.create(new Member("username123", "password123123123"));
    } */

    @Test
    void readTest() {
        // given
        Member m = new Member("readTestUsername", "readTestPassword");
        
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
        Member m = new Member(username, passwordBefore, nicknameBefore), m_;
        
        // when
        repo.create(m);
        repo.updatePassword(username, passwordAfter);
        m_ = repo.read(username).get();

        // then
        assertThat(m_.getPassword()).isNotEqualTo(passwordBefore);
        assertThat(m_.getPassword()).isEqualTo(passwordAfter);
        
        // when
        repo.updateNickname(username, nicknameAfter);
        m_ = repo.read(username).get();
        
        // then
        assertThat(m_.getNickname()).isNotEqualTo(nicknameBefore);
        assertThat(m_.getNickname()).isEqualTo(nicknameAfter);
    }

    @Test
    void deleteTest() {
        // given
        String username = "deleteTestUsername", password = "deleteTestPassword";
        Member m = new Member(username, password);

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
