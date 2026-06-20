@echo off
cd /d "%~dp0..\.."
docker compose up -d postgres
echo.
echo PostgreSQL started.
echo  JDBC URL : jdbc:postgresql://localhost:5432/demo
echo  Username : postgres
echo  Password : postgres
echo.
echo Backend with PostgreSQL:
echo   cd backend
echo   .\gradlew.bat bootRun --args="--spring.profiles.active=postgres"
