package themion.my_note.backend.config;

// import javax.sql.DataSource;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    // private final DataSource dataSource;

    // @Autowired  
    // public WebSecurityConfig(DataSource dataSource) {
    //     this.dataSource = dataSource;
    // }
    
    @Override
    protected void configure (HttpSecurity http) throws Exception {
        // CSRF(Cross-Site Request Forgery) 비활성화
        http.csrf().disable()
            // 특정 경로에 권한 제어
            .authorizeRequests()
                // 권한 불필요
                // /member -> 회원가입 혹은 로그인에 사용
                .antMatchers("/member").permitAll()
                .antMatchers().hasRole("ADMIN")
                .anyRequest().authenticated();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
