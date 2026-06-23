package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Spring Boot 애플리케이션의 시작(진입) 클래스입니다.
 *
 * <p>main 메서드를 실행하면 내장 Tomcat 웹 서버가 켜지고,
 * 기본 포트 8081에서 REST API(/api/**)를 제공합니다.</p>
 *
 * <p>{@code @SpringBootApplication} 하나로 아래 설정이 자동으로 적용됩니다.</p>
 * <ul>
 *   <li>컴포넌트 스캔 (Controller, Service, Repository 등)</li>
 *   <li>application.yml 설정 로드</li>
 *   <li>Spring Data JPA + H2 DB 연결</li>
 * </ul>
 */
@SpringBootApplication
public class DemoApplication {

    /**
     * 프로그램 시작점.
     * IDE에서 이 클래스를 Run 하거나 {@code mvn spring-boot:run}으로 실행합니다.
     */
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
