package themion.my_note.backend.service;

import java.util.Optional;

// import org.springframework.security.core.userdetails.User;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;

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
    public Optional<User> get(String username) {
        return repo.findByUsername(username);
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

    /* @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        user user;
        Optional<user> result = repo.read(username);

        if (result.isEmpty()) throw new UsernameNotFoundException("user Not Found : " + username);
        user = result.get();

        return User.builder()
            .username(user.getUsername())
            .password(user.getPassword())
            .roles(user.getRole())
            .build();
    } */
    
}
