param(
    [switch]$Reset
)

$backend = Split-Path -Parent $PSScriptRoot
$dataDir = Join-Path $backend "data"

if (-not (Test-Path $dataDir)) {
    New-Item -ItemType Directory -Path $dataDir | Out-Null
}

Write-Host "========================================"
Write-Host " Local H2 Database (default)"
Write-Host "========================================"
Write-Host " Data files : $dataDir\demo-db.*"
Write-Host " JDBC URL   : jdbc:h2:file:./data/demo-db"
Write-Host " Username   : sa"
Write-Host " Password   : (empty)"
Write-Host " H2 Console : http://localhost:8080/h2-console"
Write-Host ""
Write-Host " Backend start:"
Write-Host "   cd backend"
Write-Host "   .\gradlew.bat bootRun"
Write-Host "========================================"

if ($Reset) {
    Write-Host ""
    Write-Host "Resetting database files..."
    Get-ChildItem $dataDir -Filter "demo-db.*" -ErrorAction SilentlyContinue | Remove-Item -Force
    Write-Host "Done. Restart backend to recreate schema and sample data."
}
