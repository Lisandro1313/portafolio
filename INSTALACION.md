# 🚀 GUÍA DE INSTALACIÓN Y USO

## 📋 REQUISITOS PREVIOS

Antes de empezar, asegurate de tener instalado:

1. **Node.js** (versión 16 o superior)

   - Descargá desde: https://nodejs.org/
   - Verificá la instalación: `node --version`

2. **MongoDB** (versión 5 o superior)

   - Descargá desde: https://www.mongodb.com/try/download/community
   - O usá MongoDB Atlas (en la nube): https://www.mongodb.com/atlas

3. **Git** (opcional, para control de versiones)
   - Descargá desde: https://git-scm.com/

---

## 🛠️ INSTALACIÓN PASO A PASO

### PASO 1: Instalar todas las dependencias

Abrí PowerShell en la carpeta del proyecto y ejecutá:

```powershell
npm run install:all
```

Este comando instala todas las dependencias del proyecto (frontend, backend y admin).

---

### PASO 2: Configurar variables de entorno

El archivo `.env` ya está creado en `/backend/.env`, pero asegurate de que tenga:

```
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=tu_clave_secreta_super_segura_cambiar_en_produccion
PORT=5000
NODE_ENV=development
```

⚠️ **IMPORTANTE**: Cambiá `JWT_SECRET` por una clave segura en producción.

---

### PASO 3: Iniciar MongoDB

#### Opción A: MongoDB Local

Abrí una nueva terminal de PowerShell y ejecutá:

```powershell
mongod
```

Dejá esta terminal abierta mientras trabajás.

#### Opción B: MongoDB Atlas (en la nube)

1. Creá una cuenta en https://www.mongodb.com/atlas
2. Creá un cluster gratuito
3. Obtené tu connection string
4. Reemplazá `MONGODB_URI` en `.env` con tu connection string

---

### PASO 4: Crear usuario administrador

Antes de poder usar el panel, necesitás crear un usuario admin.

**Opción A: Usando el script de inicialización**

Abrí PowerShell en la carpeta `/backend` y ejecutá:

```powershell
node -e "const bcrypt = require('bcryptjs'); const mongoose = require('mongoose'); require('dotenv').config(); mongoose.connect(process.env.MONGODB_URI).then(async () => { const User = require('./models/User'); const salt = await bcrypt.genSalt(10); const hashedPassword = await bcrypt.hash('admin123', salt); const user = new User({ username: 'admin', password: hashedPassword }); await user.save(); console.log('✅ Usuario admin creado'); process.exit(); });"
```

**Opción B: Usando una herramienta HTTP (Postman o Thunder Client)**

```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

⚠️ **IMPORTANTE**: Cambiá estas credenciales después del primer login.

---

### PASO 5: Iniciar el proyecto

Ejecutá en PowerShell desde la raíz del proyecto:

```powershell
npm run dev
```

Esto iniciará:

- ✅ Backend API: http://localhost:5000
- ✅ Frontend público: Abrí `frontend/index.html` con Live Server
- ✅ Panel admin: Abrí `admin/login.html` con Live Server

**Alternativa**: Instalá la extensión "Live Server" en VS Code y hacé click derecho en `frontend/index.html` → "Open with Live Server"

---

## 🎮 CÓMO USAR TU PORTFOLIO

### 1️⃣ Acceder al Panel de Administración

1. Abrí `admin/login.html` en tu navegador
2. Ingresá con las credenciales:
   - Usuario: `admin`
   - Contraseña: `admin123`
3. Serás redirigido al dashboard

### 2️⃣ Crear un Nuevo Proyecto

1. En el dashboard, hacé click en **"+ Nuevo Proyecto"**
2. Completá el formulario:
   - **Título**: Nombre de tu proyecto
   - **Problema**: Descripción del problema que resolvió
   - **Solución**: Sistema/plataforma que desarrollaste
   - **Resultado**: Beneficio concreto logrado
   - **Tecnologías**: Lista separada por comas (Ej: React, Node.js, MongoDB)
   - **Estado**: En producción, En pruebas, etc.
   - **Categoría**: Web, App, IA, etc.
   - **Publicar**: Marcá si querés que aparezca inmediatamente en tu portfolio
3. Hacé click en **"Guardar Proyecto"**

### 3️⃣ Ver tu Portfolio Público

1. Abrí `frontend/index.html` en tu navegador
2. Los proyectos que marcaste como "Publicados" aparecerán automáticamente
3. ✅ **No necesitás tocar código nunca más**

### 4️⃣ Editar o Eliminar Proyectos

1. En el dashboard, hacé click en **"Editar"** en el proyecto que querés modificar
2. Hacé los cambios necesarios
3. Guardá
4. Para eliminar, hacé click en **"Eliminar"** (te pedirá confirmación)

---

## 📂 ESTRUCTURA DE CARPETAS

```
portfolio-gta6/
│
├── frontend/              # Tu web pública
│   ├── index.html        # Página principal
│   ├── style.css         # Estilos GTA 6
│   └── app.js            # Lógica frontend
│
├── admin/                 # Panel de administración
│   ├── login.html        # Página de login
│   ├── dashboard.html    # Dashboard admin
│   ├── login.js          # Lógica de login
│   ├── dashboard.js      # Lógica del dashboard
│   └── admin-style.css   # Estilos del panel
│
├── backend/               # API REST + Base de datos
│   ├── models/           # Modelos de datos
│   ├── routes/           # Endpoints de la API
│   ├── middleware/       # Autenticación
│   ├── uploads/          # Archivos subidos
│   ├── server.js         # Servidor principal
│   ├── package.json
│   └── .env              # Variables de entorno
│
├── package.json           # Configuración raíz
└── README.md             # Documentación
```

---

## 🔥 COMANDOS ÚTILES

```powershell
# Instalar todo
npm run install:all

# Iniciar todo en modo desarrollo
npm run dev

# Iniciar solo el backend
npm run dev:backend

# Verificar que MongoDB está corriendo
mongo --eval "db.version()"
```

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### ❌ Error: "Cannot connect to MongoDB"

**Solución**:

1. Asegurate de que MongoDB esté corriendo (`mongod` en otra terminal)
2. Verificá que la URI en `.env` sea correcta
3. Si usás MongoDB Atlas, verificá tu connection string

### ❌ Error: "Token no válido" o "Unauthorized"

**Solución**:

1. Cerrá sesión y volvé a loguear
2. Verificá que `JWT_SECRET` esté configurado en `.env`
3. Limpiá el localStorage del navegador (F12 → Application → Local Storage → Clear)

### ❌ Error: "Port 5000 already in use"

**Solución**:

1. Cambiá el puerto en `backend/.env`: `PORT=5001`
2. Actualizá el puerto en `frontend/app.js` y `admin/login.js` y `admin/dashboard.js`

### ❌ Los proyectos no se muestran en el frontend

**Solución**:

1. Asegurate de que el backend esté corriendo
2. Verificá que los proyectos estén marcados como "Publicados" en el panel admin
3. Abrí la consola del navegador (F12) para ver errores

---

## 🌐 CÓMO PUBLICAR EN INTERNET

### Frontend (Gratis)

**Opción 1: Netlify**

1. Subí la carpeta `frontend` a GitHub
2. Conectá tu repo a Netlify
3. Deploy automático

**Opción 2: Vercel**

1. `npm install -g vercel`
2. `cd frontend`
3. `vercel`

### Backend + Base de Datos

**Opción 1: Railway.app (Gratis)**

1. Creá cuenta en railway.app
2. Deploy del backend desde GitHub
3. Agregá MongoDB desde sus servicios

**Opción 2: Render.com (Gratis)**

1. Creá cuenta en render.com
2. Deploy del backend
3. Usá MongoDB Atlas para la DB

---

## 📧 CAMBIAR TUS DATOS DE CONTACTO

Editá `frontend/index.html`, sección de contacto (líneas ~154-164):

```html
<a href="mailto:tuemail@ejemplo.com" class="btn btn-contact"> 📧 Email </a>
<a
  href="https://linkedin.com/in/tu-perfil"
  target="_blank"
  class="btn btn-contact"
>
  💼 LinkedIn
</a>
<a href="https://wa.me/tunumero" target="_blank" class="btn btn-contact">
  📱 WhatsApp
</a>
```

---

## 🎯 PRÓXIMOS PASOS

✅ Creá tu primer proyecto desde el panel
✅ Personalizá tus datos de contacto
✅ Cambiá las credenciales de admin
✅ Agregá más proyectos
✅ Publicá tu portfolio en internet

---

## 📞 SOPORTE

Si tenés algún problema, revisá:

1. La consola del navegador (F12)
2. La terminal donde corre el backend
3. Los logs de MongoDB

¡Tu portfolio profesional ya está listo! 🎉
