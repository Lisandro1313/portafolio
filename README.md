# 🎮 Portfolio Profesional Estilo GTA 6

Sistema completo de portfolio con panel de administración, diseñado para desarrolladores que quieren mostrar sus proyectos de forma profesional sin tocar código cada vez que agregan algo nuevo.

## ✨ Características

- ✅ **Frontend público** con diseño estilo GTA 6 (neón, gradientes, animaciones)
- ✅ **Panel de administración** privado y seguro
- ✅ **Backend API REST** con Node.js + Express
- ✅ **Base de datos** MongoDB
- ✅ **Sistema de autenticación** con JWT
- ✅ **Carga dinámica** de proyectos (sin tocar código nunca más)
- ✅ **Responsive** design
- ✅ **Listo para producción**

## 📁 Estructura del Proyecto

```
portafolio/
├── frontend/          # Web pública (HTML, CSS, JS)
├── backend/           # API REST + Base de datos
│   ├── models/        # Modelos de MongoDB
│   ├── routes/        # Rutas de API
│   ├── middleware/    # Autenticación
│   └── uploads/       # Archivos subidos
├── admin/             # Panel de administración
├── .gitignore         # Archivos a ignorar
└── README.md          # Este archivo
```

## 🚀 Inicio Rápido

### Opción 1: Instalación Automática (Windows)

```bash
# Clonar el repositorio
git clone https://github.com/Lisandro1313/portafolio.git
cd portafolio

# Ejecutar instalación automática
INSTALAR.bat
```

### Opción 2: Instalación Manual

#### 1. Instalar Dependencias

```bash
npm run install:all
```

#### 2. Configurar Backend

El archivo `.env` ya está creado en `backend/.env`. Si necesitas modificarlo:

```env
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=tu_clave_secreta_super_segura_cambiar_esto
PORT=5000
NODE_ENV=development
```

#### 3. Iniciar MongoDB

```bash
mongod
```

#### 4. Crear Usuario Administrador

```bash
cd backend
npm run create-admin
```

Sigue las instrucciones para ingresar tu usuario y contraseña.

#### 5. Iniciar el Proyecto

**Opción A - Script automático (Windows):**
```bash
INICIAR.bat
```

**Opción B - Manual:**
```bash
# Terminal 1: MongoDB
mongod

# Terminal 2: Backend
cd backend
npm run dev

# Abrir en navegador:
# - frontend/index.html (con Live Server)
# - admin/login.html (con Live Server)
```

## 📖 Documentación

- **[INICIO-RAPIDO-CORREGIDO.md](INICIO-RAPIDO-CORREGIDO.md)** - Guía de inicio paso a paso
- **[CHECKLIST-VERIFICACION.md](CHECKLIST-VERIFICACION.md)** - Lista de verificación completa
- **[PROBLEMAS-CORREGIDOS.md](PROBLEMAS-CORREGIDOS.md)** - Historial de correcciones
- **[PERSONALIZACION.md](PERSONALIZACION.md)** - Guía de personalización
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Guía de deployment

## 🌐 Endpoints de la API

### Públicos
- `GET /api/projects` - Obtener proyectos publicados
- `GET /api/projects/:id` - Obtener proyecto por ID
- `POST /api/auth/login` - Iniciar sesión

### Privados (requieren token)
- `GET /api/projects/all` - Todos los proyectos (admin)
- `POST /api/projects` - Crear proyecto
- `PUT /api/projects/:id` - Actualizar proyecto
- `DELETE /api/projects/:id` - Eliminar proyecto

## 🔧 Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js + Express
- **Base de Datos**: MongoDB
- **Autenticación**: JWT (JSON Web Tokens)
- **Upload**: Multer
- **Seguridad**: bcryptjs

## 🎯 Flujo de Trabajo

1. **Iniciar sesión** en el panel admin (`admin/login.html`)
2. **Crear proyectos** desde el dashboard
3. **Publicar/Despublicar** según necesites
4. Los proyectos aparecen **automáticamente** en el frontend público

## ❓ Problemas Comunes

### MongoDB no conecta
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solución:** Ejecutar `mongod` en otra terminal

### Backend no inicia
```
Error: Cannot find module 'express'
```
**Solución:** Ejecutar `npm run install:all`

### Frontend no muestra proyectos
**Solución:** 
1. Verificar que backend esté corriendo
2. Verificar que hay proyectos publicados
3. Revisar consola del navegador para errores

### No puedo crear usuario admin
```
Error: Ya existe un usuario administrador
```
**Solución:** 
```bash
mongosh
use portfolio
db.users.deleteMany({})
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de código abierto. Úsalo como quieras.

## 👨‍💻 Autor

**Lisandro**
- GitHub: [@Lisandro1313](https://github.com/Lisandro1313)

## 🙏 Agradecimientos

- Diseño inspirado en GTA 6
- Comunidad de desarrolladores
- MongoDB, Express, Node.js

---

**¿Necesitás ayuda?** Revisá la [documentación completa](INICIO-RAPIDO-CORREGIDO.md) o abrí un issue en GitHub.
