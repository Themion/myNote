package themion.my_note.backend.repository;

import java.util.List;
import java.util.Optional;

import themion.my_note.backend.domain.Memo;

public interface MemoRepository {
    public Memo save(Memo memo);
    public Optional<Memo> findById(Long id);
    public List<Memo> findByUserId(Long userId);
    public Optional<Memo> findByIdAndUserId(Long id, Long userId);
    public void update(Long id, Memo memo);
    public void deleteById(Long id);
}
