@echo off
title Portfolio GTA 6 - Menu Principal
color 0A

:menu
cls
echo ========================================
echo   PORTFOLIO GTA 6 - MENU PRINCIPAL
echo ========================================
echo.
echo   1. Instalar dependencias
echo   2. Crear usuario administrador
echo   3. Iniciar proyecto completo
echo   4. Solo iniciar MongoDB
echo   5. Solo iniciar Backend
echo   6. Ver estado de servicios
echo   7. Limpiar base de datos
echo   8. Salir
echo.
echo ========================================
set /p opcion="Selecciona una opcion (1-8): "

if "%opcion%"=="1" goto instalar
if "%opcion%"=="2" goto crear_admin
if "%opcion%"=="3" goto iniciar_todo
if "%opcion%"=="4" goto solo_mongo
if "%opcion%"=="5" goto solo_backend
if "%opcion%"=="6" goto estado
if "%opcion%"=="7" goto limpiar_db
if "%opcion%"=="8" goto salir

echo.
echo Opcion no valida. Presiona cualquier tecla para continuar...
pause >nul
goto menu

:instalar
cls
echo ========================================
echo   INSTALANDO DEPENDENCIAS
echo ========================================
echo.
call npm run install:all
echo.
echo Instalacion completada!
echo.
pause
goto menu

:crear_admin
cls
echo ========================================
echo   CREAR USUARIO ADMINISTRADOR
echo ========================================
echo.
cd backend
call npm run create-admin
cd ..
echo.
pause
goto menu

:iniciar_todo
cls
echo ========================================
echo   INICIANDO PROYECTO COMPLETO
echo ========================================
echo.
call INICIAR.bat
goto menu

:solo_mongo
cls
echo ========================================
echo   INICIANDO SOLO MONGODB
echo ========================================
echo.
start "MongoDB" cmd /k "mongod"
echo.
echo MongoDB iniciado en una nueva ventana
echo.
pause
goto menu

:solo_backend
cls
echo ========================================
echo   INICIANDO SOLO BACKEND
echo ========================================
echo.
cd backend
start "Backend API" cmd /k "npm run dev"
cd ..
echo.
echo Backend iniciado en una nueva ventana
echo Puerto: 5000
echo.
pause
goto menu

:estado
cls
echo ========================================
echo   ESTADO DE SERVICIOS
echo ========================================
echo.
echo Verificando puertos en uso...
echo.
netstat -ano | findstr :5000
netstat -ano | findstr :27017
echo.
echo Puerto 5000 = Backend API
echo Puerto 27017 = MongoDB
echo.
echo Si no ves puertos, los servicios no estan corriendo
echo.
pause
goto menu

:limpiar_db
cls
echo ========================================
echo   LIMPIAR BASE DE DATOS
echo ========================================
echo.
echo ADVERTENCIA: Esto eliminara TODOS los datos
echo (usuarios y proyectos)
echo.
set /p confirmar="Estas seguro? (S/N): "
if /i "%confirmar%"=="S" (
    echo.
    echo Ejecuta estos comandos en mongosh:
    echo   use portfolio
    echo   db.dropDatabase()
    echo.
    start "MongoDB Shell" cmd /k "mongosh"
) else (
    echo.
    echo Operacion cancelada
)
echo.
pause
goto menu

:salir
cls
echo.
echo Gracias por usar Portfolio GTA 6!
echo.
timeout /t 2 /nobreak >nul
exit

