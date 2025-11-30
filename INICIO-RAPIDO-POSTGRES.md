# 🚀 INICIO RÁPIDO - PostgreSQL Local

## 📦 Pre-requisitos

1. **Instalar PostgreSQL** (si no lo tienes):

   - Descarga: https://www.postgresql.org/download/windows/
   - Durante instalación, recuerda la contraseña de `postgres`

2. **Verificar que PostgreSQL esté corriendo**:
   ```powershell
   psql --version
   ```

---

## ⚡ Configuración Rápida (5 minutos)

### Paso 1: Crear Base de Datos

Abre **pgAdmin** o ejecuta en PowerShell:

```powershell
# Conectar a PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE portafolio;

# Salir
\q
```

### Paso 2: Configurar `.env`

Edita el archivo `backend/.env`:

```env
DATABASE_URL=postgresql://postgres:TU_PASSWORD@localhost:5432/portafolio
```

**Reemplaza `TU_PASSWORD` con tu contraseña de PostgreSQL**

### Paso 3: Instalar Dependencias

```powershell
cd backend
npm install
```

### Paso 4: Inicializar Tablas

```powershell
node scripts/init-database.js
```

### Paso 5: Crear Usuario Admin

```powershell
node scripts/create-admin-postgres.js
```

**Credenciales:**

- Username: `admin`
- Password: `3QHM/EZI5PMWyny3`

### Paso 6: Iniciar Servidor

```powershell
node server.js
```

---

## ✅ Verificar que Funciona

1. Abre: http://localhost:5000
2. Verás: `{"message":"Backend Portfolio API funcionando correctamente","database":"PostgreSQL"}`
3. Ve al admin: http://localhost:5000/admin
4. Login con `admin` / `3QHM/EZI5PMWyny3`
5. Crea un proyecto
6. Ve al frontend: http://localhost:3000 (abre `frontend/index.html`)

---

## 🔧 Solución de Problemas

### Error: "password authentication failed"

Tu contraseña en `.env` está mal. Verifica:

```env
DATABASE_URL=postgresql://postgres:TU_PASSWORD_REAL@localhost:5432/portafolio
```

### Error: "database does not exist"

Crea la base de datos:

```powershell
psql -U postgres -c "CREATE DATABASE portafolio;"
```

### Error: "relation does not exist"

No ejecutaste el script de inicialización:

```powershell
node scripts/init-database.js
```

### Error: "connection refused"

PostgreSQL no está corriendo. Inícialo:

- **Windows**: Servicios → PostgreSQL → Iniciar
- **O usa pgAdmin** para iniciar el servidor

---

## 📊 Comandos Útiles

### Ver todos los proyectos en la DB

```powershell
psql -U postgres -d portafolio -c "SELECT * FROM projects;"
```

### Ver todas las visitas

```powershell
psql -U postgres -d portafolio -c "SELECT COUNT(*) FROM visits;"
```

### Resetear base de datos

```powershell
psql -U postgres -c "DROP DATABASE portafolio;"
psql -U postgres -c "CREATE DATABASE portafolio;"
node scripts/init-database.js
node scripts/create-admin-postgres.js
```

---

## 🌐 Subir a Render (Producción)

Ver archivo: **PASOS-RENDER-POSTGRESQL.md**

---

✅ **¡Listo!** Ahora tienes datos persistentes que NO se pierden.
