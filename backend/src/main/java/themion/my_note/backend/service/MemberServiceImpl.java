package themion.my_note.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

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
    public void leave(String username) {
        repo.delete(username);
    }
    
}
