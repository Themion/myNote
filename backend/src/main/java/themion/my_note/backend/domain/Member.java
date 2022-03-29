package themion.my_note.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// 각 사용자의 정보
// lombok을 이용해 간단하게 POJO를 구현
@AllArgsConstructor
@Data
@NoArgsConstructor
public class Member {
    private String username, password, nickname, role;

    public Member(String username, String password) {
        this(username, password, username, "USER");
    }

    public Member(String username, String password, String nickname) {
        this(username, password, nickname, "USER");
    }
}
