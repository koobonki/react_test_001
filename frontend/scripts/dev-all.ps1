$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$backend = Join-Path (Split-Path -Parent $root) "backend"
$frontend = $root

Write-Host "Starting backend (Spring Boot)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList @(
  "-NoExit",
  "-Command",
  "Set-Location '$backend'; mvn spring-boot:run"
)

Start-Sleep -Seconds 2

Write-Host "Starting frontend (Vite)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList @(
  "-NoExit",
  "-Command",
  "Set-Location '$frontend'; npm run dev"
)

Write-Host ""
Write-Host "Backend : http://localhost:8080/api/products" -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Green
