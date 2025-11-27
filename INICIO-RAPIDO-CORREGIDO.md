# 🚀 Guía de Inicio Rápido

## Prerequisitos
- Node.js (v14 o superior)
- MongoDB instalado y corriendo
- Git

## Paso 1: Instalar Dependencias

```bash
npm run install:all
```

Esto instalará las dependencias en:
- Raíz del proyecto
- Backend
- Frontend
- Panel Admin

## Paso 2: Configurar Backend

El archivo `.env` ya está creado en `backend/.env` con valores por defecto.

**IMPORTANTE:** Cambia el `JWT_SECRET` por algo seguro antes de usar en producción.

## Paso 3: Iniciar MongoDB

Asegúrate de que MongoDB esté corriendo:

```bash
mongod
```

En otra terminal, verifica la conexión:

```bash
mongosh
```

## Paso 4: Crear Usuario Administrador

```bash
cd backend
npm run create-admin
```

Sigue las instrucciones para crear tu usuario admin (username y password).

## Paso 5: Iniciar el Proyecto

Desde la raíz del proyecto:

```bash
npm run dev
```

Esto iniciará:
- ✅ Backend API en http://localhost:5000
- ✅ Frontend público en http://localhost:5500 (con Live Server o similar)
- ✅ Panel Admin en http://localhost:5501 (con Live Server o similar)

## Paso 6: Acceder al Sistema

1. **Frontend Público**: Abre `frontend/index.html` con Live Server
2. **Panel Admin**: Abre `admin/login.html` con Live Server
3. Inicia sesión con las credenciales que creaste

## Problemas Comunes

### MongoDB no conecta
```
❌ Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solución:** Asegúrate de que MongoDB esté corriendo (`mongod`)

### El frontend no carga proyectos
**Solución:** Verifica que el backend esté corriendo en el puerto 5000

### Error al crear usuario admin
**Solución:** Ya existe un usuario. Usa las credenciales anteriores o elimina la base de datos:
```bash
mongosh
use portfolio
db.dropDatabase()
```

## Siguiente Paso

Ve a la [Guía de Personalización](PERSONALIZACION.md) para customizar tu portfolio.
