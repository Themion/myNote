package themion.my_note.backend.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import lombok.AllArgsConstructor;
import themion.my_note.backend.domain.User;
import themion.my_note.backend.repository.UserRepository;

@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repo;

    @Override
    public void join(User user) {
        repo.findByUsername(user.getUsername()).ifPresentOrElse(
            username -> {},
            () -> repo.save(user)
        );
    }

    @Override
    public User get(String username) {
        return repo.findByUsername(username).orElseThrow(() -> noUsername(username));
    }

    @Override
    public void changePassword(String username, String password) {
        repo.updatePasswordByUsername(username, password);
    }

    @Override
    public void changeNickname(String username, String nickname) {
        repo.updateNicknameByUsername(username, nickname);
    }

    @Override
    public void leave(String username) {
        repo.deleteByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.get(username);
    }

    public static UsernameNotFoundException noUsername(String username) {
        return new UsernameNotFoundException("존재하지 않는 사용자 이름입니다: " + username);
    }
    
}
