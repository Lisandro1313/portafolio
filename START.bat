@echo off
echo ====================================
echo   INICIAR PORTFOLIO - DESARROLLO
echo ====================================
echo.
echo [1/2] Iniciando Backend (puerto 5000)...
start "Backend" cmd /k "cd backend && node server.js"
timeout /t 2 /nobreak >nul

echo [2/2] Iniciando Frontend (puerto 3000)...
start "Frontend" cmd /k "cd frontend && node server.js"
timeout /t 2 /nobreak >nul

echo.
echo ====================================
echo   SERVIDORES INICIADOS
echo ====================================
echo.
echo  Frontend: http://localhost:3000
echo  Backend:  http://localhost:5000
echo  Admin:    http://localhost:3000/admin/login.html
echo.
echo  Usuario: admin
echo  Pass:    admin123
echo.
echo Presiona cualquier tecla para abrir el navegador...
pause >nul
start http://localhost:3000
