@echo off
setlocal
set BACKEND=%~dp0..
set DATA_DIR=%BACKEND%\data

if not exist "%DATA_DIR%" mkdir "%DATA_DIR%"

echo ========================================
echo  Local H2 Database (default)
echo ========================================
echo  Data files : %DATA_DIR%\demo-db.*
echo  JDBC URL   : jdbc:h2:file:./data/demo-db
echo  Username   : sa
echo  Password   : (empty)
echo  H2 Console : http://localhost:8080/h2-console
echo.
echo  Backend start:
echo    cd backend
echo    .\gradlew.bat bootRun
echo ========================================

if /I "%~1"=="reset" (
  echo.
  echo Resetting database files...
  del /Q "%DATA_DIR%\demo-db.*" 2>nul
  echo Done. Restart backend to recreate schema and sample data.
)
