@echo off
echo ========================================
echo   INSTALACION PORTFOLIO GTA 6
echo ========================================
echo.

REM Verificar si Node.js esta instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js no esta instalado
    echo Por favor instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js detectado
node --version
echo.

REM Verificar si MongoDB esta instalado
mongod --version >nul 2>&1
if errorlevel 1 (
    echo [ADVERTENCIA] MongoDB no detectado
    echo Necesitas MongoDB para que el proyecto funcione
    echo Descargalo desde https://www.mongodb.com/try/download/community
    echo.
) else (
    echo [OK] MongoDB detectado
    mongod --version | findstr /C:"db version"
    echo.
)

echo ========================================
echo   INSTALANDO DEPENDENCIAS...
echo ========================================
echo.

REM Instalar dependencias raiz
echo [1/4] Instalando dependencias raiz...
call npm install
if errorlevel 1 (
    echo [ERROR] Fallo la instalacion en raiz
    pause
    exit /b 1
)
echo [OK] Dependencias raiz instaladas
echo.

REM Instalar dependencias backend
echo [2/4] Instalando dependencias backend...
cd backend
call npm install
if errorlevel 1 (
    echo [ERROR] Fallo la instalacion en backend
    pause
    exit /b 1
)
cd ..
echo [OK] Dependencias backend instaladas
echo.

REM Instalar dependencias frontend
echo [3/4] Instalando dependencias frontend...
cd frontend
call npm install
if errorlevel 1 (
    echo Nota: Frontend no tiene package.json, continuando...
)
cd ..
echo [OK] Frontend verificado
echo.

REM Instalar dependencias admin
echo [4/4] Instalando dependencias admin...
cd admin
call npm install
if errorlevel 1 (
    echo Nota: Admin no tiene package.json, continuando...
)
cd ..
echo [OK] Admin verificado
echo.

echo ========================================
echo   CONFIGURACION COMPLETADA
echo ========================================
echo.
echo Proximo paso: Configura tu entorno
echo.
echo 1. Inicia MongoDB:
echo    mongod
echo.
echo 2. Crea tu usuario admin:
echo    cd backend
echo    npm run create-admin
echo.
echo 3. Inicia el proyecto:
echo    npm run dev
echo.
echo 4. Abre los archivos HTML con Live Server:
echo    - frontend/index.html
echo    - admin/login.html
echo.
echo Mas informacion en INICIO-RAPIDO-CORREGIDO.md
echo.
pause
