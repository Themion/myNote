package themion.my_note.backend.config;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import themion.my_note.backend.repository.JdbcMemberRepository;
import themion.my_note.backend.repository.MemberRepository;

@Configuration
public class MvcConfig {
    
    @Bean
    public MemberRepository memberRepository(DataSource dataSource) {
        return new JdbcMemberRepository(dataSource);
    }

}
