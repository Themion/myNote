package themion.my_note.backend.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import themion.my_note.backend.repository.JdbcMemoRepository;
import themion.my_note.backend.repository.JdbcUserRepository;
import themion.my_note.backend.repository.MemoRepository;
import themion.my_note.backend.repository.UserRepository;
import themion.my_note.backend.service.MemoService;
import themion.my_note.backend.service.MemoServiceImpl;
import themion.my_note.backend.service.UserService;
import themion.my_note.backend.service.UserServiceImpl;

// MVC 패턴 설정 관리
@Configuration
public class MvcConfig {

    private final DataSource dataSource;

    @Autowired
    public MvcConfig(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Bean
    public UserService userService() {
        return new UserServiceImpl(userRepository());
    }

    @Bean
    public UserRepository userRepository() {
        return new JdbcUserRepository(dataSource);
    }

    @Bean
    public MemoService memoService() {
        return new MemoServiceImpl(memoRepository());
    }

    @Bean
    public MemoRepository memoRepository() {
        return new JdbcMemoRepository(dataSource);
    }
}
