package themion.my_note.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class LogInDTO {
    @NonNull
    private String username;

    @NonNull
    private String password;
}
