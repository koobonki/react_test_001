@echo off
cd /d "%~dp0.."
echo [frontend] Starting Vite on http://localhost:5173
call npm.cmd run dev
