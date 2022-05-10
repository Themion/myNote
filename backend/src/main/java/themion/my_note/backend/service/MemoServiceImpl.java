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
    public Memo write(Memo memo) {
        Long id = memo.getId();
        if (id == null) return repo.save(memo);
        // id값이 있다면 update, 없다면 create하므로
        // findById(id)는 반드시 isPresent한 값
        repo.findById(id).ifPresentOrElse(
            m -> {repo.update(m.getId(), memo); },
            () -> { repo.save(memo); }
        );
        return repo.findById(id).get();
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
        return repo.findByIdAndUserId(id, userId).isPresent();
    }

    @Override
    public void remove(Long id) {
        repo.deleteById(id);
    }
    
}
