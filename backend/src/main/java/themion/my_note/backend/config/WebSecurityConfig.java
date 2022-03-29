package themion.my_note.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    
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
                .anyRequest().authenticated()
            .and()
                // 로그인 제어
                .formLogin()
                    .loginPage("/login")
                    // .usernameParameter("username")
                    // .passwordParameter("password")
                    .defaultSuccessUrl("/")
            .and()
                .logout()
                    .logoutSuccessUrl("/")
                    .invalidateHttpSession(true);
    }

}
