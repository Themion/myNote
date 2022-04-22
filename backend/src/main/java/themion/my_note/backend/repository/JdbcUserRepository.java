package themion.my_note.backend.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.transaction.annotation.Transactional;

import themion.my_note.backend.domain.User;

@Transactional
public class JdbcUserRepository implements UserRepository {

    // DB 서버와 Spring간의 드라이버 역할
    private final JdbcTemplate template;

    @Autowired
    public JdbcUserRepository(DataSource dataSource) {
        template = new JdbcTemplate(dataSource);
    }

    // H2 DB의 record를 user 객체로 mapping
    private RowMapper<User> mapper() {
        return new RowMapper<User>() {
            // 쿼리 결과의 entity 하나를 성분별로 쪼개 rs에 저장한 다음 user꼴로 변환
            // 이 과정을 모든 entity에 반복하여 적절한 container에 저장
            @Override
            public User mapRow(ResultSet rs, int rowNum) throws SQLException {
                return User.builder()
                    .id(rs.getLong("id"))
                    .username(rs.getString("username"))
                    .password(rs.getString("password"))
                    .nickname(rs.getString("nickname"))
                    .isAdmin(rs.getBoolean("is_admin"))
                    .build();
            }
        };
    }

    // user를 user 테이블에 삽입
    @Override
    public void save(User user) {
        // String userQuery = "insert into USER(username, password, nickname) values(?, ?, ?)";
        // template.update(userQuery, user.getUsername(), user.getPassword(), user.getNickname());
        SimpleJdbcInsert insert = new SimpleJdbcInsert(template);
        insert.withTableName("user").usingGeneratedKeyColumns("id");

        Map<String, Object> params = new HashMap<>();
        params.put("username", user.getUsername());
        params.put("password", user.getPassword());
        params.put("nickname", user.getNickname());
        params.put("is_admin", user.getIsAdmin());
        
        Number id = insert.executeAndReturnKey(params);
        user.setId(id.longValue());
    }

    // user에서 username을 가진 user를 찾아 Optional 형태로 반환
    @Override
    public Optional<User> findByUsername(String username) {
        String query = "select * from user where username = ?";
        return template.query(query, mapper(), username).stream().findAny();
    }

    // username을 가진 user의 password를 갱신
    @Override
    public void updatePasswordByUsername(String username, String password) {
        String query = "update user set password = ? where username = ?";
        template.update(query, password, username);
    }
    
    // username을 가진 user의 nickname을 갱신
    @Override
    public void updateNicknameByUsername(String username, String nickname) {
        String query = "update user set nickname = ? where username = ?";
        template.update(query, nickname, username);
    }

    // username을 지닌 user를 삭제
    @Override
    public void deleteByUsername(String username) {
        String query = "delete from user where username = ?";
        template.update(query, username);
    }

}
