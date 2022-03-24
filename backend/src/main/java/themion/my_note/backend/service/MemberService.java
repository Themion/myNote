package themion.my_note.backend.service;

import java.util.Optional;

import themion.my_note.backend.domain.Member;

public interface MemberService {
    // 회원을 DB에 추가
    public void join(Member member);
    // DB에서 username을 찾아 Optional 형태로 반환
    public Optional<Member> get(String username);
    // DB에서 username의 password 혹은 nickname을 변경
    public void change(String username, Optional<String> password, Optional<String> nickname);
    // DB에서 username을 제거
    public void leave(String username);
}
