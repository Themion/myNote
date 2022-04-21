package themion.my_note.backend.repository;

import java.util.Optional;

import themion.my_note.backend.domain.User;

public interface UserRepository {
    // user를 user 테이블에 삽입
    public void save(User user);
    // user에서 username을 가진 user를 찾아 Optional 형태로 반환
    public Optional<User> findByUsername(String username);
    // username을 가진 user의 password를 갱신
    public void updatePasswordByUsername(String username, String password);
    // username을 가진 user의 nickname을 갱신
    public void updateNicknameByUsername(String username, String nickname);
    // username을 지닌 user를 삭제
    public void deleteByUsername(String username);
}
