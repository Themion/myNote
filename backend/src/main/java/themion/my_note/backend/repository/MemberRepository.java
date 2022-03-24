package themion.my_note.backend.repository;

import java.util.Optional;

import themion.my_note.backend.domain.Member;

public interface MemberRepository {
    public void create(Member member);
    public Optional<Member> read(String username);
    public void updatePassword(String username, String password);
    public void updateNickname(String username, String nickname);
    public void delete(String username);
}
