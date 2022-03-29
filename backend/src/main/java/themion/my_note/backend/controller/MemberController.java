package themion.my_note.backend.controller;

import java.util.Map;
import java.util.Optional;

import themion.my_note.backend.domain.Member;

public interface MemberController {
    // DB에 member를 추가
    public Map<String, String> signUp(Member member);
    // username의 정보를 반환
    public Optional<Member> memberInfo(String username);
    // username의 password를 변경
    public void changePassword(String username, String password);
    // username의 nickname을 변경
    public void changeNickname(String username, String nickname);
    // username의 password 혹은 nickname을 변경
    public void changeInfo(String username, String password, String nickname);
    public void deleteMember(String username);
}
