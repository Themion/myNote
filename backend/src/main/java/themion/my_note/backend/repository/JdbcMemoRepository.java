package themion.my_note.backend.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;

import themion.my_note.backend.domain.Memo;

public class JdbcMemoRepository implements MemoRepository {
    
    private final JdbcTemplate template;

    @Autowired
    public JdbcMemoRepository(DataSource dataSource) {
        this.template = new JdbcTemplate(dataSource);
    }

    private RowMapper<Memo> mapper() {
        return new RowMapper<Memo>() {

            @Override
            public Memo mapRow(ResultSet rs, int rowNum) throws SQLException {
                return Memo.builder()
                    .id(rs.getLong("id"))
                    .userid(rs.getLong("user_id"))
                    .title(rs.getString("title"))
                    .memo(rs.getString("memo"))
                    .build();
            }
            
        };
    }

    @Override
    public Memo save(Memo memo) {
        SimpleJdbcInsert insert = new SimpleJdbcInsert(this.template);
        insert.withTableName("memo").usingGeneratedKeyColumns("id");
        
        Map<String, Object> params = new HashMap<>();
        params.put("user_id", memo.getUserid());
        params.put("title", memo.getTitle());
        params.put("memo", memo.getMemo());

        Number id = insert.executeAndReturnKey(new MapSqlParameterSource(params));
        memo.setId(id.longValue());

        return memo;
    }

    @Override
    public Optional<Memo> findById(Long id) {
        String query = "select * from memo where id = ?";
        return template.query(query, mapper(), id).stream().findAny();
    }

    @Override
    public List<Memo> findByUserId(Long userId) {
        String query = "select * from memo where user_id = ? order by user_id desc";
        return template.query(query, mapper(), userId);
    }
    @Override
    public Optional<Memo> findByIdAndUserId(Long id, Long userId) {
        String query = "select * from memo where id = ? and user_id = ?";
        return template.query(query, mapper(), id, userId).stream().findAny();
    }

    @Override
    public void update(Long id, Memo memo) {
        String query = "update memo set title = ?, memo = ? where id = ?";
        template.update(query, memo.getTitle(), memo.getMemo(), id);
    }

    @Override
    public void deleteById(Long id) {
        String query = "delete from memo where id = ?";
        template.update(query, id);
    }
    
}
