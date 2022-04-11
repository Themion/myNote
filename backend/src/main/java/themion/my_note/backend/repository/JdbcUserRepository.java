package themion.my_note.backend.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
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

    // user를 user 테이블에 삽입
    @Override
    public void create(User user) {
        String userQuery = "insert into USER(username, password, nickname) values(?, ?, ?)";
        template.update(userQuery, user.getUsername(), user.getPassword(), user.getNickname());
    }

    // user에서 username을 가진 user를 찾아 Optional 형태로 반환
    @Override
    public Optional<User> read(String username) {
        String query = "select * from user where username = ?";
        try {
            // DB에서 query를 실행한 결과를 Optional로 묶어 반환
            return Optional.ofNullable(template.queryForObject(query, mapper(), username));
        // query 결과가 존재하지 않는다면 EmptyResultDataAccessException 발생
        } catch (EmptyResultDataAccessException e) {
            // 결과가 존재하지 않으므로 빈 Optional을 반환
            return Optional.empty();
        }
    }

    // username을 가진 user의 password를 갱신
    @Override
    public void updatePassword(String username, String password) {
        String query = "update user set password = ? where username = ?";
        template.update(query, password, username);
    }
    
    // username을 가진 user의 nickname을 갱신
    @Override
    public void updateNickname(String username, String nickname) {
        String query = "update user set nickname = ? where username = ?";
        template.update(query, nickname, username);
    }

    // username을 지닌 user를 삭제
    @Override
    public void delete(String username) {
        String query = "delete from user where username = ?";
        template.update(query, username);
    }

    // H2 DB의 record를 user 객체로 mapping
    private RowMapper<User> mapper() {
        return new RowMapper<User>() {
            // 쿼리 결과의 entity 하나를 성분별로 쪼개 rs에 저장한 다음 user꼴로 변환
            // 이 과정을 모든 entity에 반복하여 적절한 container에 저장
            @Override
            public User mapRow(ResultSet rs, int rowNum) throws SQLException {
                return User.builder()
                    .username(rs.getString("username"))
                    .password(rs.getString("password"))
                    .nickname(rs.getString("nickname"))
                    .isAdmin(rs.getBoolean("is_admin"))
                    .build();
            }
        };
    }

}
