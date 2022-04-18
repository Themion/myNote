package themion.my_note.backend.service;

import java.util.Optional;

// import org.springframework.security.core.userdetails.UserDetailsService;

import themion.my_note.backend.domain.User;

public interface UserService/*  extends UserDetailsService  */{
    // 회원을 DB에 추가
    public void join(User user);
    // DB에서 username을 찾아 Optional 형태로 반환
    public Optional<User> get(String username);
    // DB에서 username의 password를 변경
    public void changePassword(String username, String password);
    // DB에서 username의 nickname을 변경
    public void changeNickname(String username, String nickname);
    // DB에서 username을 제거
    public void leave(String username);
}
