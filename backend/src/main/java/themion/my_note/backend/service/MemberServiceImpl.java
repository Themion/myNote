package themion.my_note.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.userdetails.User;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;

import themion.my_note.backend.domain.Member;
import themion.my_note.backend.repository.MemberRepository;

public class MemberServiceImpl implements MemberService {

    private final MemberRepository repo;

    @Autowired
    public MemberServiceImpl(MemberRepository memberRepository) {
        this.repo = memberRepository;
    }

    @Override
    public void join(Member member) {
        repo.read(member.getUsername()).ifPresentOrElse(
            username -> {},
            () -> repo.create(member)
        );
    }

    @Override
    public Optional<Member> get(String username) {
        return repo.read(username);
    }

    @Override
    public void change(String username, Optional<String> password, Optional<String> nickname) {
        password.ifPresent(val -> repo.updatePassword(username, val));
        nickname.ifPresent(val -> repo.updateNickname(username, val));
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
        Member member;
        Optional<Member> result = repo.read(username);

        if (result.isEmpty()) throw new UsernameNotFoundException("Member Not Found : " + username);
        member = result.get();

        return User.builder()
            .username(member.getUsername())
            .password(member.getPassword())
            .roles(member.getRole())
            .build();
    } */
    
}
