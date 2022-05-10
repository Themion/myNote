package themion.my_note.backend.service;

import java.util.List;
import java.util.Optional;

import themion.my_note.backend.domain.Memo;

public interface MemoService {
    public Memo write(Memo memo);
    public Optional<Memo> read(Long id);
    public List<Memo> get(Long userId);
    public boolean isBelongTo(Long id, Long userId);
    public void remove(Long id);
}
