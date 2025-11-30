# 🎯 PASOS PARA DESPLEGAR CON POSTGRESQL EN RENDER

## ✅ Paso 1: Subir el código a GitHub

```bash
cd c:\Users\Usuario\OneDrive\Escritorio\portafolio
git add .
git commit -m "Migración a PostgreSQL completa"
git push
```

---

## ✅ Paso 2: Crear Base de Datos PostgreSQL en Render

1. Ve a **Render Dashboard**: https://dashboard.render.com/
2. Click en **"New +"** → **"PostgreSQL"**
3. Configura:
   - **Name**: `portafolio-db`
   - **Database**: `portafolio`
   - **User**: (se genera automático)
   - **Region**: `Oregon (US West)` o el que prefieras
   - **Plan**: **FREE** ✅
4. Click **"Create Database"**
5. **IMPORTANTE**: Copia la **Internal Database URL** (la vas a necesitar)
   - Se ve así: `postgresql://usuario:password@dpg-xxxxx/portafolio`

---

## ✅ Paso 3: Configurar el Web Service

1. Ve a tu **Web Service** existente en Render
2. En el menú lateral, click en **"Environment"**
3. Agrega esta variable de entorno:

```
DATABASE_URL = <pega aquí la Internal Database URL que copiaste>
```

4. Click **"Save Changes"**

---

## ✅ Paso 4: Configurar el Build

1. En tu Web Service, ve a **"Settings"**
2. En **"Build Command"** asegúrate que diga:

```bash
cd backend && npm install
```

3. En **"Start Command"** asegúrate que diga:

```bash
cd backend && node server.js
```

---

## ✅ Paso 5: Inicializar la Base de Datos

**OPCIÓN A: Desde Render Shell (Recomendado)**

1. En tu **PostgreSQL Database** en Render
2. Click en **"Connect"** → **"External Connection"**
3. Copia el comando `psql`
4. Abre tu terminal local (PowerShell) y pégalo
5. Ejecuta el SQL de setup:

```sql
-- Copiar y pegar en psql
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    problem TEXT NOT NULL,
    solution TEXT NOT NULL,
    result TEXT NOT NULL,
    technologies TEXT,
    status VARCHAR(100) DEFAULT 'En producción',
    category VARCHAR(100) DEFAULT 'Web',
    video_url TEXT,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS visits (
    id SERIAL PRIMARY KEY,
    ip VARCHAR(45) NOT NULL,
    country VARCHAR(2) DEFAULT 'AR',
    country_flag VARCHAR(10) DEFAULT '🇦🇷',
    user_agent TEXT,
    visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published);
CREATE INDEX IF NOT EXISTS idx_projects_created ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_visits_date ON visits(visited_at DESC);
```

**OPCIÓN B: Desde Render Web Shell**

1. En tu **Web Service**, espera que se depliegue
2. Ve a **"Shell"** (menú lateral)
3. Ejecuta:

```bash
cd backend
node scripts/create-admin-postgres.js
```

---

## ✅ Paso 6: Crear Usuario Admin

En la terminal psql o desde el Shell del Web Service:

```bash
node scripts/create-admin-postgres.js
```

Esto creará el usuario:

- **Username**: `admin`
- **Password**: `3QHM/EZI5PMWyny3`

---

## ✅ Paso 7: Verificar que Todo Funciona

1. Espera que el deploy termine (botón verde en Render)
2. Abre tu sitio: `https://portafolio-x88w.onrender.com`
3. Ve al admin: `https://portafolio-x88w.onrender.com/admin`
4. Login con: `admin` / `3QHM/EZI5PMWyny3`
5. Crea un proyecto de prueba
6. Verifica que aparece en el frontend

---

## 🔥 RESUMEN RÁPIDO

```bash
# 1. Push a GitHub
git add . && git commit -m "PostgreSQL migration" && git push

# 2. Crear PostgreSQL en Render (FREE)

# 3. Copiar "Internal Database URL"

# 4. Agregar variable de entorno en Web Service:
DATABASE_URL = postgresql://...

# 5. Conectar con psql y ejecutar setup.sql

# 6. Crear admin:
node scripts/create-admin-postgres.js

# 7. ¡Listo! Datos persistentes para siempre
```

---

## 💾 ¿POR QUÉ POSTGRESQL?

✅ **Datos persistentes**: No se pierden al redesplegar  
✅ **Gratis en Render**: 256MB suficiente para tu portafolio  
✅ **Profesional**: Base de datos real como en producción  
✅ **Escalable**: Si creces, solo cambias de plan

---

## 🆘 PROBLEMAS COMUNES

**Error: "relation does not exist"**
→ No ejecutaste el SQL de setup. Ve al Paso 5.

**Error: "password authentication failed"**
→ La DATABASE_URL está mal. Copia de nuevo la "Internal Database URL".

**Error al crear admin**
→ Asegúrate que la tabla `users` existe primero (Paso 5).

**Los datos siguen sin guardar**
→ Verifica que la variable `DATABASE_URL` está configurada en Environment.

---

## 📧 Contacto

Si algo falla, revisa los logs en Render:

- **Web Service** → **"Logs"**
- **PostgreSQL** → **"Logs"**

¡Ahora tienes persistencia real! 🚀
