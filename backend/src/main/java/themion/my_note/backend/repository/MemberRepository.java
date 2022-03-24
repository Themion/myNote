package themion.my_note.backend.repository;

import java.util.Optional;

import themion.my_note.backend.domain.Member;

public interface MemberRepository {
    // member를 MEMBER 테이블에 삽입
    public void create(Member member);
    // MEMBER에서 username을 가진 member를 찾아 Optional 형태로 반환
    public Optional<Member> read(String username);
    // username을 가진 member의 password를 갱신
    public void updatePassword(String username, String password);
    // username을 가진 member의 nickname을 갱신
    public void updateNickname(String username, String nickname);
    // username을 지닌 member를 삭제
    public void delete(String username);
}
