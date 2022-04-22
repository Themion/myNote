package themion.my_note.backend.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

// import org.springframework.security.core.userdetails.UserDetailsService;

import themion.my_note.backend.domain.User;

public interface UserService/*  extends UserDetailsService  */{
    // 회원을 DB에 추가
    public void join(User user);
    // DB에서 username을 찾아 User 형태로 반환
    public User get(String username);
    // DB에서 username의 password를 변경
    public void changePassword(String username, String password);
    // DB에서 username의 nickname을 변경
    public void changeNickname(String username, String nickname);
    // DB에서 username을 제거
    public void leave(String username);
    // username이 존재하지 않을 때 사용할 에러메세지
    public static String noUsernameMsg(String username) {
        return "존재하지 않는 사용자 이름입니다: " + username;
    }
    // username이 존재하지 않을 때 발생시킬 Exception
    public static UsernameNotFoundException noUsername(String username) {
        return new UsernameNotFoundException(noUsernameMsg(username));
    }
}
