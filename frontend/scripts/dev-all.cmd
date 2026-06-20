@echo off
set ROOT=%~dp0..
set BACKEND=%~dp0..\..\backend

echo Starting backend and frontend in separate windows...
start "backend" cmd /k "cd /d "%BACKEND%" && mvn spring-boot:run"
timeout /t 3 /nobreak >nul
start "frontend" cmd /k "cd /d "%ROOT%" && npm.cmd run dev"

echo.
echo Backend : http://localhost:8080/api/products
echo Frontend: http://localhost:5173
