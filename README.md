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

## Estructura del Proyecto

```
portfolio-gta6/
├── frontend/          # Web pública
├── backend/           # API REST + Base de datos
├── admin/             # Panel de administración
└── README.md
```

## Instalación

### 1. Instalar todas las dependencias

```bash
npm run install:all
```

### 2. Configurar variables de entorno

Crear archivo `.env` en `/backend`:

```
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=tu_clave_secreta_aqui
PORT=5000
```

### 3. Iniciar MongoDB

```bash
mongod
```

### 4. Ejecutar todo en modo desarrollo

```bash
npm run dev
```

Esto abrirá:

- Frontend público: http://localhost:5173
- Panel admin: http://localhost:5174
- Backend API: http://localhost:5000

## Usuario Admin por Defecto

```
Usuario: admin
Contraseña: admin123
```

⚠️ **IMPORTANTE**: Cambia estas credenciales después del primer login.

## Flujo de Trabajo

1. **Login**: Accedés a `/login` en tu web
2. **Panel**: Entrás al dashboard de administración
3. **Crear Proyecto**: Subís título, descripción, imágenes, videos
4. **Publicar**: El proyecto aparece automáticamente en tu portfolio público

## Tecnologías

- **Frontend**: HTML, CSS, JavaScript vanilla (optimizado)
- **Backend**: Node.js + Express
- **Base de Datos**: MongoDB
- **Autenticación**: JWT
- **Upload**: Multer
