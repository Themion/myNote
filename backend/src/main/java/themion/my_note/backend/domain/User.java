package themion.my_note.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

// 각 사용자의 정보
// lombok을 이용해 간단하게 POJO를 구현
@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class User {
    @NonNull
    private String username, password;
    private String nickname;
    private Boolean isAdmin;
}
