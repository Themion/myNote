package themion.my_note.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
public class Memo {
    private Long id;
    private Long userid;
    private String title;
    private String memo;
}
