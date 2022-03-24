package themion.my_note.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

// 각 사용자의 정보
// lombok을 이용해 간단하게 POJO를 구현
@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class Member {
    String username, password, nickname;

    public Member(String username, String password) {
        this.username = username;
        this.password = password;
        this.nickname = username;
    }
}
