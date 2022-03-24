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

public class JdbcMemberRepository implements MemberRepository{

    private final JdbcTemplate template;

    @Autowired
    public JdbcMemberRepository(DataSource dataSource) {
        template = new JdbcTemplate(dataSource);
    }

    @Override
    public void create(Member member) {
        String query = "insert into MEMBER(username, password, nickname) values(?, ?, ?)";
        template.update(query, member.getUsername(), member.getPassword(), member.getNickname());
    }

    @Override
    public Optional<Member> read(String username) {
        String query = "select * from MEMBER where username = ?";
        // PK 값이 username인 record가 없을 경우 EmptyResultDataAccessException 발생 -> Optional.empty() 반환
        try {
            Member result = template.queryForObject(query, mapper(), username);
            return Optional.ofNullable(result);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    @Override
    public void updatePassword(String username, String password) {
        String query = "update MEMBER set password = ? where username = ?";
        template.update(query, password, username);
    }

    @Override
    public void updateNickname(String username, String nickname) {
        String query = "update MEMBER set nickname = ? where username = ?";
        template.update(query, nickname, username);
    }

    @Override
    public void delete(String username) {
        String query = "delete from MEMBER where username = ?";
        template.update(query, username);
    }

    // H2 DB의 record를 Member 객체로 mapping
    private RowMapper<Member> mapper() {
        return new RowMapper<Member>() {
            @Override 
            public Member mapRow(ResultSet rs, int rowNum) throws SQLException {
                return new Member(rs.getString("username"), rs.getString("password"), rs.getString("nickname"));
            }
        };
    }

}
