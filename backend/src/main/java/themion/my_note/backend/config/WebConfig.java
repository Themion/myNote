package themion.my_note.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// 네트워크 설정 관린
@Configuration
public class WebConfig implements WebMvcConfigurer {
    // localhost:3000(frontend의 npm start)와 localhost:5000(frontend의 npm build)에서의 접근을 허용
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("http://localhost:3000", "http://localhost:5000");
    }
}
