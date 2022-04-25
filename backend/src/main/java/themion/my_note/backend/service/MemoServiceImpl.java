package themion.my_note.backend.service;

import java.util.List;
import java.util.Optional;

import lombok.AllArgsConstructor;
import themion.my_note.backend.domain.Memo;
import themion.my_note.backend.repository.MemoRepository;

@AllArgsConstructor
public class MemoServiceImpl implements MemoService {

    private final MemoRepository repo;

    @Override
    public void write(Memo memo) {
        if (memo.getId() == null) repo.save(memo);
        else repo.findById(memo.getId()).ifPresentOrElse(
            m -> { repo.update(m.getId(), memo); },
            () -> { repo.save(memo); }
        );
    }

    @Override
    public Optional<Memo> read(Long id) {
        return repo.findById(id);
    }

    @Override
    public List<Memo> get(Long userId) {
        return repo.findByUserId(userId);
    }

    @Override
    public boolean isBelongTo(Long id, Long userId) {
        return repo.findByIdAndUserId(id, userId).isEmpty();
    }

    @Override
    public void remove(Long id) {
        repo.deleteById(id);
    }
    
}
