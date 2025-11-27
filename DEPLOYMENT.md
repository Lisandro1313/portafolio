# 🚀 GUÍA DE DESPLIEGUE A PRODUCCIÓN

Cómo publicar tu portfolio en Internet de forma gratuita.

---

## 🎯 OPCIONES DE HOSTING GRATUITO

### Frontend (Web Pública)

- ✅ **Netlify** (Recomendado)
- ✅ **Vercel**
- ✅ **GitHub Pages**

### Backend + Base de Datos

- ✅ **Railway.app** (Recomendado - Incluye MongoDB)
- ✅ **Render.com** + MongoDB Atlas
- ✅ **Fly.io**

---

## 📦 OPCIÓN 1: NETLIFY (Frontend) + RAILWAY (Backend)

### 🔹 PASO 1: Preparar el código

#### 1.1 Crear repositorio en GitHub

```bash
cd c:\Users\Usuario\OneDrive\Escritorio\portafolio
git init
git add .
git commit -m "Portfolio inicial"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/portfolio.git
git push -u origin main
```

#### 1.2 Crear archivo .gitignore (ya existe)

Asegurate de que `.gitignore` incluya:

```
node_modules/
.env
uploads/
*.log
```

---

### 🔹 PASO 2: Desplegar Backend en Railway

1. **Ir a** https://railway.app
2. **Crear cuenta** (con GitHub)
3. **New Project** → **Deploy from GitHub repo**
4. **Seleccionar** tu repositorio
5. **Settings** → **Root Directory** → Escribir: `backend`
6. **Variables de entorno:**

   - Click en **Variables**
   - Agregar:
     ```
     MONGODB_URI=mongodb://localhost:27017/portfolio
     JWT_SECRET=clave_super_segura_de_produccion
     PORT=5000
     NODE_ENV=production
     ```

7. **Agregar MongoDB:**

   - Click en **New** → **Database** → **Add MongoDB**
   - Copiar la `MONGODB_URI` generada
   - Reemplazar en tus variables de entorno

8. **Obtener URL del backend:**
   - Railway te dará una URL tipo: `https://tu-app.railway.app`
   - Guardarla para el siguiente paso

---

### 🔹 PASO 3: Actualizar URLs del Frontend

Editar estos archivos para usar la URL de producción:

**frontend/app.js:**

```javascript
const API_URL = "https://tu-app.railway.app/api";
```

**admin/login.js:**

```javascript
const API_URL = "https://tu-app.railway.app/api";
```

**admin/dashboard.js:**

```javascript
const API_URL = "https://tu-app.railway.app/api";
```

Commitear cambios:

```bash
git add .
git commit -m "Actualizar URLs de producción"
git push
```

---

### 🔹 PASO 4: Desplegar Frontend en Netlify

1. **Ir a** https://www.netlify.com
2. **Crear cuenta** (con GitHub)
3. **Add new site** → **Import an existing project**
4. **Connect to GitHub** → Seleccionar tu repo
5. **Configure:**
   - Base directory: `frontend`
   - Build command: (dejar vacío)
   - Publish directory: `.` (punto)
6. **Deploy**

Tu portfolio estará en: `https://tu-nombre.netlify.app`

---

### 🔹 PASO 5: Crear usuario admin en producción

Desde Railway:

1. Click en tu servicio backend
2. **Settings** → **Command**
3. Agregar: `npm run create-admin`
4. Ejecutar una vez
5. Volver a poner: `npm start`

O conectarte por SSH y ejecutar el script.

---

## 📦 OPCIÓN 2: VERCEL (Frontend) + RENDER (Backend)

### 🔹 Backend en Render.com

1. **Ir a** https://render.com
2. **Crear cuenta**
3. **New** → **Web Service**
4. **Connect repository**
5. **Configurar:**
   - Name: portfolio-backend
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. **Variables de entorno:**

   ```
   MONGODB_URI=tu-connection-string-de-atlas
   JWT_SECRET=clave_super_segura
   PORT=5000
   ```

7. **Crear base de datos en MongoDB Atlas:**
   - https://www.mongodb.com/atlas
   - Crear cluster gratuito
   - Obtener connection string
   - Usarlo en `MONGODB_URI`

### 🔹 Frontend en Vercel

1. **Ir a** https://vercel.com
2. **Import Project**
3. **Seleccionar** tu repo
4. **Configure:**
   - Framework Preset: Other
   - Root Directory: `frontend`
5. **Deploy**

---

## 🌐 CONFIGURAR DOMINIO PERSONALIZADO (Opcional)

### Comprar dominio

- Namecheap: ~$10/año
- Google Domains: ~$12/año
- GoDaddy: variable

### Configurar en Netlify/Vercel

1. **Domain Settings**
2. **Add custom domain**
3. **Seguir instrucciones DNS**

---

## 🔒 CONFIGURAR HTTPS

Netlify y Vercel configuran HTTPS automáticamente con Let's Encrypt.

Railway también provee HTTPS por defecto.

---

## 📊 MONITOREO Y ANALYTICS

### Google Analytics

Agregar en `frontend/index.html`:

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-XXXXXXXXXX");
</script>
```

### Uptime Monitoring

- UptimeRobot (gratis): https://uptimerobot.com
- Monitorea que tu backend esté siempre activo

---

## 🛡️ SEGURIDAD EN PRODUCCIÓN

### 1. Variables de entorno seguras

```bash
# Generar JWT_SECRET seguro
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 2. CORS configurado correctamente

En `backend/server.js`:

```javascript
app.use(
  cors({
    origin: ["https://tu-portfolio.netlify.app", "https://tudominio.com"],
    credentials: true,
  })
);
```

### 3. Rate limiting

Instalar:

```bash
npm install express-rate-limit
```

Agregar en `backend/server.js`:

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de requests
});

app.use("/api/", limiter);
```

---

## ✅ CHECKLIST PRE-DEPLOYMENT

- [ ] Código subido a GitHub
- [ ] `.gitignore` configurado (sin .env ni node_modules)
- [ ] Variables de entorno configuradas en hosting
- [ ] MongoDB Atlas o servicio de BD configurado
- [ ] URLs actualizadas (localhost → producción)
- [ ] Usuario admin creado en producción
- [ ] HTTPS funcionando
- [ ] Dominio personalizado (opcional)
- [ ] Google Analytics configurado (opcional)
- [ ] Probado login y creación de proyectos
- [ ] Portfolio público visible

---

## 🔄 ACTUALIZAR DESPUÉS DEL DEPLOYMENT

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Descripción del cambio"
git push
```

Netlify/Vercel/Railway redesplegarán automáticamente.

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### Error: "Cannot connect to backend"

- Verificar que backend esté corriendo en Railway/Render
- Verificar URLs en frontend/app.js
- Revisar logs del backend

### Error: "MongoDB connection failed"

- Verificar connection string en variables de entorno
- Verificar whitelist de IPs en MongoDB Atlas (permitir 0.0.0.0/0)
- Verificar usuario/contraseña de MongoDB

### Error: "Login no funciona"

- Verificar que usuario admin esté creado en producción
- Revisar consola del navegador (F12)
- Verificar que backend responda: `https://tu-backend.com/api/auth/login`

---

¡Tu portfolio estará online y accesible desde cualquier parte del mundo! 🌍
