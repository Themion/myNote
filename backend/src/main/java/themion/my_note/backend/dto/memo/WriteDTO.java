package themion.my_note.backend.dto.memo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class WriteDTO {
    private String title;
    private String memo;
}
