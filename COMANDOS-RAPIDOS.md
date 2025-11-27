# ⚡ Comandos Rápidos - Portfolio GTA 6

## 🚀 Inicio Rápido

### Windows (Recomendado)
```bash
# Menú interactivo con todas las opciones
MENU.bat

# O directamente
INSTALAR.bat  # Primera vez
INICIAR.bat   # Iniciar proyecto
```

### Manual
```bash
# 1. Instalar
npm run install:all

# 2. Crear admin
cd backend
npm run create-admin

# 3. Iniciar
npm run dev
```

---

## 📦 Instalación

```bash
# Instalar todas las dependencias (raíz + backend)
npm run install:all

# Solo raíz
npm install

# Solo backend
cd backend && npm install
```

---

## 🗄️ MongoDB

```bash
# Iniciar MongoDB
mongod

# Conectar a MongoDB Shell
mongosh

# Usar base de datos del portfolio
use portfolio

# Ver usuarios
db.users.find()

# Ver proyectos
db.projects.find()

# Eliminar todos los usuarios
db.users.deleteMany({})

# Eliminar todos los proyectos
db.projects.deleteMany({})

# Eliminar base de datos completa
db.dropDatabase()
```

---

## 👤 Usuario Admin

```bash
# Crear usuario admin
cd backend
npm run create-admin

# Responder las preguntas:
# - Username: tu_usuario
# - Password: tu_contraseña (mínimo 6 caracteres)
```

---

## 🔧 Backend

```bash
# Modo desarrollo (con nodemon)
cd backend
npm run dev

# Modo producción
cd backend
npm start

# Verificar si está corriendo
curl http://localhost:5000

# O abrir en navegador
start http://localhost:5000
```

---

## 🌐 Frontend y Admin

### Con Live Server (VS Code)
1. Click derecho en `frontend/index.html`
2. "Open with Live Server"
3. Repetir para `admin/login.html`

### Manual
```bash
# Abrir en navegador predeterminado
start frontend/index.html
start admin/login.html
```

---

## 🔍 Verificación y Debug

```bash
# Ver puertos en uso
netstat -ano | findstr :5000    # Backend
netstat -ano | findstr :27017   # MongoDB

# Ver versiones
node --version
npm --version
mongod --version

# Ver logs del backend
cd backend
npm run dev

# Revisar errores en navegador
# F12 > Console
```

---

## 🧹 Limpieza

```bash
# Eliminar node_modules
rmdir /s /q node_modules
cd backend && rmdir /s /q node_modules

# Eliminar package-lock.json
del package-lock.json
cd backend && del package-lock.json

# Reinstalar todo
npm run install:all
```

---

## 📝 Git

```bash
# Estado
git status

# Agregar cambios
git add .

# Commit
git commit -m "Descripción del cambio"

# Push
git push origin main

# Ver cambios
git diff

# Ver historial
git log --oneline
```

---

## 🔐 Seguridad

```bash
# Cambiar JWT_SECRET
# Editar backend/.env
# Cambiar el valor de JWT_SECRET por algo único

# Generar JWT_SECRET seguro (Node.js)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 📊 Testing

### Probar endpoints con curl

```bash
# Obtener proyectos públicos
curl http://localhost:5000/api/projects

# Login (obtener token)
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"tu_usuario\",\"password\":\"tu_password\"}"

# Crear proyecto (requiere token)
curl -X POST http://localhost:5000/api/projects ^
  -H "Content-Type: application/json" ^
  -H "x-auth-token: TU_TOKEN_AQUI" ^
  -d "{\"title\":\"Test\",\"problem\":\"...\",\"solution\":\"...\",\"result\":\"...\"}"
```

---

## 🐛 Solución de Problemas

### MongoDB no inicia
```bash
# Verificar si ya está corriendo
tasklist | findstr mongod

# Matar proceso si está colgado
taskkill /F /IM mongod.exe

# Reiniciar
mongod
```

### Backend no conecta a MongoDB
```bash
# Verificar .env
type backend\.env

# Verificar conexión MongoDB
mongosh --eval "db.version()"
```

### Puerto 5000 ocupado
```bash
# Ver qué lo está usando
netstat -ano | findstr :5000

# Matar proceso (reemplazar PID)
taskkill /F /PID numero_del_pid
```

### No puedo crear admin
```bash
# Eliminar usuarios existentes
mongosh
use portfolio
db.users.deleteMany({})
exit

# Crear nuevo
cd backend
npm run create-admin
```

---

## 📦 Deployment

```bash
# Build para producción
npm run build

# Variables de entorno para producción
# Editar backend/.env:
NODE_ENV=production
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/portfolio
JWT_SECRET=clave_super_secreta_generada_aleatoriamente
PORT=5000
```

---

## 🔄 Actualización del Proyecto

```bash
# Obtener últimos cambios
git pull origin main

# Reinstalar dependencias
npm run install:all

# Reiniciar servicios
INICIAR.bat
```

---

## 📚 Documentación

```bash
# Ver documentación
type README.md
type INICIO-RAPIDO-CORREGIDO.md
type CHECKLIST-VERIFICACION.md
type PROBLEMAS-CORREGIDOS.md
```

---

## 🎯 Atajos Útiles

### Desarrollo diario
```bash
# Inicio rápido
MENU.bat  # Opción 3

# Crear proyecto de prueba
# 1. Abrir admin/login.html
# 2. Login con tus credenciales
# 3. Crear nuevo proyecto
# 4. Ver en frontend/index.html
```

### Primera vez
```bash
# Setup completo
INSTALAR.bat
cd backend
npm run create-admin
cd ..
INICIAR.bat
```

---

**Tip:** Guarda este archivo para referencia rápida!
