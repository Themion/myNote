package themion.my_note.backend.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import themion.my_note.backend.domain.User;
import themion.my_note.backend.repository.UserRepository;

@Component
@AllArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService{

    private UserRepository repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.repo.read(username).orElseThrow(() -> new UsernameNotFoundException("Username " + username + " not found"));
        return new UserDetailsImpl(user);
    }
    
}
