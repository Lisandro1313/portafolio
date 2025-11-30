# 🚀 Guía de Deployment - Render.com

## ✅ Pre-requisitos

- Cuenta en GitHub (ya tienes el repo)
- Cuenta en Render.com (gratis)

## 📝 Pasos para Deploy

### 1️⃣ Preparar el Repositorio

```bash
git add .
git commit -m "Preparado para deployment en Render"
git push origin main
```

### 2️⃣ Crear cuenta en Render

1. Ve a https://render.com
2. Regístrate con tu cuenta de GitHub
3. Autoriza el acceso a tus repositorios

### 3️⃣ Crear el Web Service

#### Backend + Frontend (TODO EN UNO):

1. Click en "New +" → "Web Service"
2. Conecta tu repositorio: `Lisandro1313/portafolio`
3. Configura:

   - **Name**: `portafolio`
   - **Region**: Oregon (US West)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: Free

4. Variables de Entorno (Environment):

   ```
   NODE_ENV=production
   PORT=5000
   JWT_SECRET=[Auto-generate]
   ```

5. Click en "Create Web Service"

### 4️⃣ Esperar el Deploy

- Render instalará dependencias
- Iniciará el servidor
- Te dará una URL: `https://portafolio-xxxx.onrender.com`

### 5️⃣ Acceder a tu Portfolio

- **Portfolio**: `https://tu-url.onrender.com`
- **Admin Panel**: `https://tu-url.onrender.com/admin/login.html`
- **Credenciales**: admin / admin123

## ⚠️ IMPORTANTE

### Primera carga lenta

El plan gratuito de Render "duerme" tu app después de 15 minutos de inactividad.
La primera visita puede tardar 30-50 segundos en "despertar".

### Alternativas más rápidas:

- **Vercel** (frontend) + **Render** (backend) - RECOMENDADO
- **Netlify** (frontend) + **Railway** (backend)
- **Render** con plan pagado ($7/mes) - sin sleep

## 🔧 Si algo falla

### Error de build:

```bash
# Verificar que package.json tenga todas las dependencias
cd backend
npm install
```

### Error 404:

- Verifica que NODE_ENV=production esté configurado
- Revisa los logs en Render Dashboard

### Error de conexión API:

- Las rutas ya están configuradas para detectar automáticamente el entorno
- En producción usa `/api`, en local usa `http://localhost:5000/api`

## 📊 Monitoreo

- Dashboard de Render muestra logs en tiempo real
- Puedes ver las visitas en el panel admin
- Los datos se guardan en archivos JSON en el servidor

## 🎯 Próximos pasos (opcional)

1. Comprar dominio personalizado (Google Domains, Namecheap)
2. Conectarlo en Render → Settings → Custom Domain
3. Habilitar HTTPS automático (gratis con Render)

---

**¿Listo para deployar? Seguí los pasos y en 10 minutos tu portfolio estará online!** 🚀
