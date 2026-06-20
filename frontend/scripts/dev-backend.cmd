@echo off
cd /d "%~dp0..\..\backend"
echo [backend] Starting Spring Boot on http://localhost:8080
mvn spring-boot:run
