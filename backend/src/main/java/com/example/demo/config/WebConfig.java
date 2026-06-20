package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 웹 관련 공통 설정 클래스.
 *
 * <p>Frontend(React, localhost:5173)와 Backend(Spring Boot, localhost:8081)는
 * 포트가 다르기 때문에 브라우저 CORS 정책에 막힐 수 있습니다.
 * 이 설정으로 Frontend에서 Backend API를 호출할 수 있게 허용합니다.</p>
 */
@Configuration
public class WebConfig {

    /**
     * CORS(Cross-Origin Resource Sharing) 설정 Bean.
     * /api/** 경로에 대해 localhost:5173 출처의 요청을 허용합니다.
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:5173") // React dev 서버 주소
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*");
            }
        };
    }
}
