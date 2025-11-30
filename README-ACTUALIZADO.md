# 📋 README ACTUALIZADO - Portfolio Full Stack

## 🚀 Características

✨ **Portfolio moderno** con diseño GTA 6 (colores neón rosa, cyan y morado)  
🔐 **Panel de administración** con autenticación JWT  
📊 **Analytics de visitas** con tracking de IPs y países  
📁 **Sistema de archivos JSON** - Sin necesidad de MongoDB  
🎨 **Diseño responsive** adaptable a todos los dispositivos  
⚡ **Deploy rápido** en Render.com en 5 minutos  

---

## 🛠️ Tecnologías

### Frontend
- HTML5, CSS3, JavaScript vanilla
- Diseño responsive con animaciones suaves
- Colores neón estilo GTA 6

### Backend
- Node.js + Express
- JWT para autenticación
- **Sistema de archivos JSON** (sin MongoDB)
- Bcrypt para contraseñas
- Analytics de visitantes

---

## 📁 Estructura del Proyecto

```
portafolio/
├── frontend/          # Portfolio público
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── server.js      # Servidor HTTP simple
├── admin/            # Panel de administración
│   ├── login.html
│   ├── dashboard.html
│   ├── admin-style.css
│   └── dashboard.js
├── backend/          # API Backend
│   ├── server.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   └── analytics.js
│   ├── models/
│   │   ├── User.js
│   │   └── Project.js
│   ├── data/         # Almacenamiento JSON
│   │   ├── users.json
│   │   ├── projects.json
│   │   └── visits.json
│   └── middleware/
│       └── auth.js
└── .env              # Variables de entorno
```

---

## ⚡ Inicio Rápido (Desarrollo Local)

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/Lisandro1313/portafolio.git
cd portafolio
```

### 2️⃣ Instalar dependencias
```bash
cd backend
npm install
```

### 3️⃣ Configurar variables de entorno
El archivo `.env` ya está creado con valores por defecto:
```env
PORT=5000
JWT_SECRET=dev_secret_key_change_in_production_12345
NODE_ENV=development
```

### 4️⃣ Iniciar proyecto
Opción A - **Script automático** (Windows):
```bash
# Desde la raíz del proyecto
START.bat
```

Opción B - **Manual**:
```bash
# Terminal 1: Backend
cd backend
node server.js

# Terminal 2: Frontend
cd frontend
node server.js
```

### 5️⃣ Acceder
- **Portfolio**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login.html
- **Credenciales**: Ver archivo `CREDENCIALES-ADMIN.txt`

---

## 🌐 Deploy en Render.com

### Pasos:
1. **Push a GitHub** (ya hecho)
2. Crear cuenta en https://render.com
3. Click "New +" → "Web Service"
4. Conectar repositorio: `Lisandro1313/portafolio`
5. Configurar:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Environment**:
     - `NODE_ENV=production`
     - `PORT=5000`
     - `JWT_SECRET=[Auto-generate]`
6. Deploy! 🚀

**Tu portfolio estará en**: `https://tu-app.onrender.com`

Ver guía completa en: `GUIA-DEPLOYMENT.md`

---

## 📊 Panel de Administración

### Funcionalidades:
✅ **CRUD de proyectos** - Crear, editar y eliminar  
✅ **Ordenar proyectos** - Por fecha, título, estado o categoría  
✅ **Analytics de visitas** - Visitas totales, últimas 24h, países  
✅ **Tabla de visitantes** - IPs, países con banderas, navegadores  
✅ **Export a CSV** - Descargar todas las visitas  
✅ **Publicar/Despublicar** proyectos  

### Crear un proyecto:
Campos requeridos:
- **Título**: Nombre del proyecto
- **Problema**: Qué problema resolvía
- **Solución**: Sistema que desarrollaste
- **Resultado**: Beneficio logrado
- **Tecnologías**: React, Node.js, etc.
- **Estado**: En producción, En pruebas, etc.
- **Categoría**: Web, App, IA, etc.

---

## 🔐 Seguridad

### Cambiar contraseña admin:
```bash
cd backend
node scripts/update-admin.js
```

Esto generará una nueva contraseña segura automáticamente.

---

## 📝 Características del Sistema de Archivos

### Ventajas vs MongoDB:
✅ Sin instalación de base de datos  
✅ Deploy más rápido  
✅ Datos visibles en archivos JSON  
✅ Backup simple (copiar archivos)  
✅ Perfecto para portfolios pequeños/medianos  

### Archivos de datos:
- `backend/data/users.json` - Usuario admin
- `backend/data/projects.json` - Proyectos
- `backend/data/visits.json` - Analytics de visitas

---

## 🎨 Personalización

### Colores (editar en `frontend/style.css`):
```css
:root {
    --neon-pink: #ff006e;
    --neon-purple: #8338ec;
    --neon-cyan: #06ffa5;
}
```

### Contacto (editar en `frontend/index.html`):
Ya configurado con:
- Email: lism.etcheverry@gmail.com
- WhatsApp: +542215654325
- LinkedIn y GitHub

---

## 🐛 Solución de Problemas

### Puerto en uso:
```bash
# Windows
taskkill /F /IM node.exe

# Linux/Mac
killall node
```

### Recrear archivos de datos:
```bash
cd backend
node scripts/init-data.js
```

---

## 📈 Roadmap Futuro

- [ ] Integración con servicio de geolocalización IP (ipapi.co)
- [ ] Paginación en tabla de visitantes
- [ ] Filtros avanzados de analytics
- [ ] Drag & drop para ordenar proyectos
- [ ] Upload de imágenes para proyectos
- [ ] Modo oscuro/claro toggle
- [ ] Multiidioma (ES/EN)

---

## 📄 Licencia

Este proyecto es de uso personal. Si querés usarlo como base:
1. Fork el repositorio
2. Cambiá los datos personales
3. Actualizá las credenciales
4. Deploy con tu cuenta

---

## 👤 Autor

**Lisandro Etcheverry**  
📧 lism.etcheverry@gmail.com  
💼 [LinkedIn](https://www.linkedin.com/in/lisandro-etcheverry1/)  
💻 [GitHub](https://github.com/Lisandro1313)  

---

**¿Preguntas?** Revisá la documentación en:
- `GUIA-DEPLOYMENT.md` - Deploy en Render
- `CREDENCIALES-ADMIN.txt` - Acceso al panel admin
- `START.bat` - Inicio rápido en Windows
