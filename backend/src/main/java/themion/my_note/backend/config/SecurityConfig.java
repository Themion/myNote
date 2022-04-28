package themion.my_note.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.AllArgsConstructor;
import themion.my_note.backend.security.PasswordEncoder;
import themion.my_note.backend.security.jwt.JwtAuthenticationFilter;
import themion.my_note.backend.security.jwt.JwtAuthorizationFilter;
import themion.my_note.backend.service.UserService;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserService userService;
    private final PasswordEncoder encoder;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        AuthenticationManager authenticationManager = authenticationManager();

        http
            .csrf()
                .disable()
            .cors()
                .configurationSource(corsConfigurationSource())
                .and()
            // /h2-console 사용
            .headers()
                .frameOptions()
                    .disable()
                .and()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
            .addFilter(new JwtAuthenticationFilter(authenticationManager))
            .addFilter(new JwtAuthorizationFilter(authenticationManager, userService))
            .authorizeRequests()
                .antMatchers("/h2-console/**").permitAll()

                .antMatchers(HttpMethod.POST, "/user").permitAll()
                .antMatchers(HttpMethod.PUT, "/user/**").hasRole("USER")
                .antMatchers(HttpMethod.DELETE, "/user").hasRole("USER")

                .antMatchers(HttpMethod.GET, "/session").permitAll()

                .antMatchers(HttpMethod.POST, "/memo").hasRole("USER")
                .antMatchers(HttpMethod.GET, "/memo").hasRole("USER")
                .antMatchers(HttpMethod.GET, "/memo/{id}").access("@securityUtils.ifUserHasMemo(authentication,#id)")
                .antMatchers(HttpMethod.PUT, "/memo/{id}").access("@securityUtils.ifUserHasMemo(authentication,#id)")
                .antMatchers(HttpMethod.DELETE, "/memo/{id}").access("@securityUtils.ifUserHasMemo(authentication,#id)")

                .antMatchers("/").permitAll()
                .antMatchers("/test1").hasRole("USER")
                .antMatchers("/test2").hasRole("ADMIN")

                .anyRequest().hasRole("ADMIN");
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
            .authenticationProvider(authenticationProvider());
    }

    @Bean
    DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(this.encoder);
        provider.setUserDetailsService(userService);

        return provider;
    }

    // Cross-Origin 허용
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

}
