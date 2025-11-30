# 🗄️ Migración a PostgreSQL en Render - DATOS PERSISTENTES

## ⚠️ PROBLEMA ACTUAL

**Los archivos JSON en Render se borran en cada deploy**

Render usa almacenamiento efímero. Cada vez que:

- Haces `git push`
- Render redeploya automáticamente
- Se crea un nuevo contenedor
- **Se pierden todos los datos (proyectos, visitas, etc.)**

---

## ✅ SOLUCIÓN: PostgreSQL en Render (GRATIS)

### Ventajas:

- ✅ **Gratis** - 256 MB de almacenamiento
- ✅ **Persistente** - Los datos NO se borran
- ✅ **Backups automáticos**
- ✅ **Fácil de configurar**

---

## 📝 PASOS PARA MIGRAR

### 1️⃣ Crear Base de Datos PostgreSQL

1. Ve a tu Dashboard de Render: https://dashboard.render.com
2. Click "New +" → "PostgreSQL"
3. Configuración:
   - **Name**: `portafolio-db`
   - **Database**: `portafolio`
   - **User**: (auto-generado)
   - **Region**: Oregon (US West) - misma que tu backend
   - **Instance Type**: Free
4. Click "Create Database"
5. **Guarda estas credenciales** (aparecen en la página):
   - Internal Database URL
   - External Database URL

### 2️⃣ Conectar Backend a PostgreSQL

En tu Web Service (backend):

1. Ve a "Environment"
2. Agrega nueva variable:
   ```
   DATABASE_URL = [pega Internal Database URL]
   ```

### 3️⃣ Instalar dependencias

Actualizar `backend/package.json`:

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "multer": "^1.4.5-lts.1",
    "pg": "^8.11.3",
    "pg-hstore": "^2.3.4"
  }
}
```

### 4️⃣ Crear tabla de proyectos

Archivo: `backend/db/setup.sql`

```sql
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

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5️⃣ Script de conexión

Crear `backend/db/connection.js`:

```javascript
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

// Test de conexión
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Error conectando a PostgreSQL:", err);
  } else {
    console.log("✅ PostgreSQL conectado:", res.rows[0].now);
  }
});

module.exports = pool;
```

### 6️⃣ Actualizar modelos

Ejemplo `backend/models/Project.js`:

```javascript
const pool = require("../db/connection");

class Project {
  static async find(query = {}) {
    try {
      let sql = "SELECT * FROM projects";
      const params = [];

      if (query.published !== undefined) {
        sql += " WHERE published = $1";
        params.push(query.published);
      }

      sql += " ORDER BY created_at DESC";

      const result = await pool.query(sql, params);
      return result.rows;
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }

  static async create(data) {
    const {
      title,
      problem,
      solution,
      result,
      technologies,
      status,
      category,
      videoUrl,
      published,
    } = data;

    const sql = `
            INSERT INTO projects (title, problem, solution, result, technologies, status, category, video_url, published)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *
        `;

    const result = await pool.query(sql, [
      title,
      problem,
      solution,
      result,
      technologies,
      status,
      category,
      videoUrl,
      published,
    ]);

    return result.rows[0];
  }

  // ... más métodos
}

module.exports = Project;
```

### 7️⃣ Ejecutar setup.sql

Opción A - **Desde Render Dashboard**:

1. Ve a tu PostgreSQL database
2. Click "Connect" → "psql"
3. Copia y pega el contenido de `setup.sql`

Opción B - **Desde tu PC**:

```bash
# Instalar psql (PostgreSQL client)
# Luego conectarte con External Database URL
psql [External Database URL]

# Ejecutar
\i backend/db/setup.sql
```

### 8️⃣ Crear usuario admin inicial

Script: `backend/scripts/create-admin-postgres.js`

```javascript
const bcrypt = require("bcryptjs");
const pool = require("../db/connection");

async function createAdmin() {
  const password = "TuNuevaContraseñaSegura123!";
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const sql = `
        INSERT INTO users (username, password, role)
        VALUES ($1, $2, $3)
        ON CONFLICT (username) DO UPDATE
        SET password = $2
        RETURNING username
    `;

  const result = await pool.query(sql, ["admin", hashedPassword, "admin"]);

  console.log("✅ Usuario admin creado/actualizado");
  console.log("Username:", result.rows[0].username);
  console.log("Password:", password);

  process.exit(0);
}

createAdmin();
```

Ejecutar:

```bash
cd backend
node scripts/create-admin-postgres.js
```

---

## 🚀 DEPLOY

1. Commit y push:

```bash
git add .
git commit -m "Migrado a PostgreSQL"
git push
```

2. Render redeploya automáticamente
3. Los datos ahora son **PERSISTENTES** ✅

---

## 📊 VERIFICAR QUE FUNCIONA

1. Crea un proyecto en el admin panel
2. Hace un `git push` (cualquier cambio)
3. Espera el redeploy
4. **El proyecto sigue ahí!** ✅

---

## 🔄 ALTERNATIVA MÁS SIMPLE: Supabase

Si PostgreSQL te parece complicado, **Supabase** es más fácil:

1. Cuenta gratis: https://supabase.com
2. Crea proyecto
3. Te da una URL de PostgreSQL lista
4. Usa la misma lógica de arriba
5. **BONUS**: Tiene interfaz visual para ver los datos

---

## ❓ FAQ

**¿Cuánto cuesta?**

- Render PostgreSQL: Gratis (256 MB)
- Supabase: Gratis ilimitado (con límites razonables)

**¿Se me van a borrar los datos ahora?**

- NO, con PostgreSQL los datos son permanentes

**¿Es difícil migrar?**

- Toma ~30 minutos
- Pero vale la pena para no perder datos

**¿Puedo mantener JSON files?**

- Sí, pero se borrarán en cada deploy
- Solo sirve para desarrollo local

---

**¿Querés que te ayude a migrar a PostgreSQL?** Te puedo generar todo el código! 🚀
