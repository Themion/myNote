package themion.my_note.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import themion.my_note.backend.dto.validation.MatchPassword;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class DeleteUserDTO {
    @MatchPassword
    private String password;
}
