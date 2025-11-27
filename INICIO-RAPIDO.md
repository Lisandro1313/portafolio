# ⚡ INICIO RÁPIDO - Portfolio GTA 6

## 🚀 En 5 minutos tenés tu portfolio funcionando

### 1️⃣ Instalar dependencias (primera vez)

```powershell
npm run install:all
```

⏱️ Esto tarda 2-3 minutos

---

### 2️⃣ Iniciar MongoDB

Abrí **OTRA terminal** de PowerShell y ejecutá:

```powershell
mongod
```

✅ Dejá esta terminal abierta mientras trabajás

---

### 3️⃣ Crear usuario administrador (primera vez)

En la terminal principal, ejecutá:

```powershell
cd backend
npm run create-admin
```

Credenciales creadas:

- **Usuario**: admin
- **Contraseña**: admin123

---

### 4️⃣ Iniciar el backend

Desde la carpeta `backend`:

```powershell
npm run dev
```

✅ Backend corriendo en: http://localhost:5000

---

### 5️⃣ Abrir el frontend

Opción A: **Live Server (Recomendado)**

1. Instalá la extensión "Live Server" en VS Code
2. Hacé click derecho en `frontend/index.html`
3. Seleccioná "Open with Live Server"

Opción B: **Directamente**

1. Abrí `frontend/index.html` en tu navegador
2. Si no funciona, usá Live Server

---

### 6️⃣ Acceder al panel de administración

1. Abrí `admin/login.html` con Live Server o directamente
2. Logueate con:
   - Usuario: `admin`
   - Contraseña: `admin123`

---

### 7️⃣ Crear tu primer proyecto

1. Click en **"+ Nuevo Proyecto"**
2. Completá el formulario
3. Guardá
4. ✅ Ya aparece en tu portfolio público

---

## 📊 RESUMEN DE URLS

| Servicio         | URL                                     |
| ---------------- | --------------------------------------- |
| Backend API      | http://localhost:5000                   |
| Frontend Público | `frontend/index.html` (con Live Server) |
| Panel Admin      | `admin/login.html` (con Live Server)    |
| MongoDB          | mongodb://localhost:27017/portfolio     |

---

## 🔥 COMANDOS MÁS USADOS

```powershell
# Iniciar todo (desde la raíz)
npm run dev

# Crear usuario admin (primera vez)
cd backend
npm run create-admin

# Iniciar solo el backend
cd backend
npm run dev

# Iniciar MongoDB
mongod
```

---

## ❓ PROBLEMAS COMUNES

### ❌ "Cannot connect to MongoDB"

**Solución**: Asegurate de que MongoDB esté corriendo en otra terminal (`mongod`)

### ❌ "Port 5000 already in use"

**Solución**:

1. Cerrá otras apps que usen el puerto 5000
2. O cambiá el puerto en `backend/.env`

### ❌ Los proyectos no aparecen en el frontend

**Solución**:

1. Verificá que el backend esté corriendo
2. Abrí la consola del navegador (F12) y buscá errores
3. Asegurate de que los proyectos estén marcados como "Publicados"

---

## 📁 ARCHIVOS IMPORTANTES

- `frontend/index.html` → Tu portfolio público
- `admin/login.html` → Login del panel
- `admin/dashboard.html` → Dashboard de gestión
- `backend/.env` → Configuración del backend
- `PROYECTOS-EJEMPLO.md` → Textos listos para copiar

---

## 🎯 PRÓXIMOS PASOS

✅ Cambiá las credenciales de admin
✅ Personalizá los datos de contacto en `frontend/index.html`
✅ Agregá tus proyectos reales
✅ Publicá tu portfolio en internet (ver README.md)

---

¡Listo! Tu portfolio está funcionando 🎉
