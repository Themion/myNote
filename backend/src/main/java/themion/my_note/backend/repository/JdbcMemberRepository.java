package themion.my_note.backend.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import themion.my_note.backend.domain.Member;

public class JdbcMemberRepository implements MemberRepository {

    // DB 서버와 Spring간의 드라이버 역할
    private final JdbcTemplate template;

    @Autowired
    public JdbcMemberRepository(DataSource dataSource) {
        template = new JdbcTemplate(dataSource);
    }

    // member를 MEMBER 테이블에 삽입
    @Override
    public void create(Member member) {
        String query = "insert into MEMBER(username, password, nickname, role) values(?, ?, ?, ?)";
        template.update(query, member.getUsername(), member.getPassword(), member.getNickname(), member.getRole());
    }

    // MEMBER에서 username을 가진 member를 찾아 Optional 형태로 반환
    @Override
    public Optional<Member> read(String username) {
        String query = "select * from MEMBER where username = ?";
        try {
            // DB에서 query를 실행한 결과를 Optional로 묶어 반환
            return Optional.ofNullable(template.queryForObject(query, mapper(), username));
        // query 결과가 존재하지 않는다면 EmptyResultDataAccessException 발생
        } catch (EmptyResultDataAccessException e) {
            // 결과가 존재하지 않으므로 빈 Optional을 반환
            return Optional.empty();
        }
    }

    // username을 가진 member의 password를 갱신
    @Override
    public void updatePassword(String username, String password) {
        String query = "update MEMBER set password = ? where username = ?";
        template.update(query, password, username);
    }
    
    // username을 가진 member의 nickname을 갱신
    @Override
    public void updateNickname(String username, String nickname) {
        String query = "update MEMBER set nickname = ? where username = ?";
        template.update(query, nickname, username);
    }

    // username을 지닌 member를 삭제
    @Override
    public void delete(String username) {
        String query = "delete from MEMBER where username = ?";
        template.update(query, username);
    }

    // H2 DB의 record를 Member 객체로 mapping
    private RowMapper<Member> mapper() {
        return new RowMapper<Member>() {
            // 쿼리 결과의 entity 하나를 성분별로 쪼개 rs에 저장한 다음 member꼴로 변환
            // 이 과정을 모든 entity에 반복하여 적절한 container에 저장
            @Override
            public Member mapRow(ResultSet rs, int rowNum) throws SQLException {
                return new Member(rs.getString("username"), rs.getString("password"), rs.getString("nickname"));
            }
        };
    }

}
