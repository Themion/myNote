package themion.my_note.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.userdetails.User;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;

import themion.my_note.backend.domain.User;
import themion.my_note.backend.repository.UserRepository;

public class UserServiceImpl implements UserService {

    private final UserRepository repo;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.repo = userRepository;
    }

    @Override
    public void join(User user) {
        repo.read(user.getUsername()).ifPresentOrElse(
            username -> {},
            () -> repo.create(user)
        );
    }

    @Override
    public Optional<User> get(String username) {
        return repo.read(username);
    }

    @Override
    public void changePassword(String username, String password) {
        repo.updatePassword(username, password);
    }

    @Override
    public void changeNickname(String username, String nickname) {
        repo.updatePassword(username, nickname);
    }

    @Override
    public void leave(String username) {
        repo.delete(username);
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
