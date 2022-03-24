package themion.my_note.backend.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import themion.my_note.backend.repository.JdbcMemberRepository;
import themion.my_note.backend.repository.MemberRepository;
import themion.my_note.backend.service.MemberService;
import themion.my_note.backend.service.MemberServiceImpl;

// MVC 패턴 설정 관리
@Configuration
public class MvcConfig {

    private final DataSource dataSource;

    @Autowired
    public MvcConfig(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Bean
    public MemberService memberService() {
        return new MemberServiceImpl(memberRepository());
    }

    @Bean
    public MemberRepository memberRepository() {
        return new JdbcMemberRepository(dataSource);
    }
}
