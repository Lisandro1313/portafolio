@echo off
echo ========================================
echo   INICIANDO PORTFOLIO PROFESIONAL
echo ========================================
echo.

REM Verificar si MongoDB esta instalado
where mongod >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] MongoDB no esta instalado o no esta en el PATH
    echo.
    echo Por favor instala MongoDB desde: https://www.mongodb.com/try/download/community
    echo O usa MongoDB Atlas ^(en la nube^)
    pause
    exit /b 1
)

echo [1/3] Iniciando MongoDB...
start "MongoDB" cmd /k "mongod"
timeout /t 3 /nobreak >nul

echo [2/3] Iniciando Backend API...
cd backend
start "Backend API" cmd /k "npm run dev"
cd ..
timeout /t 2 /nobreak >nul

echo [3/3] Abriendo Frontend...
start "" "frontend\index.html"
timeout /t 1 /nobreak >nul

echo.
echo ========================================
echo   PORTFOLIO INICIADO CORRECTAMENTE
echo ========================================
echo.
echo Backend API: http://localhost:5000
echo Frontend: Abierto en tu navegador
echo Panel Admin: admin\login.html
echo.
echo IMPORTANTE: Usa las credenciales que creaste con 'npm run create-admin'
echo Si no creaste un usuario, ejecuta:
echo   cd backend
echo   npm run create-admin
echo.
echo Presiona cualquier tecla para abrir el panel admin...
pause >nul

start "" "admin\login.html"

echo.
echo Todo listo! Para detener los servicios cierra las ventanas de terminal.
echo.
pause
