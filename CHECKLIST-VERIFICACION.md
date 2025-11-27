# 🔍 Checklist de Verificación del Portfolio

Usa este checklist para asegurarte de que todo está funcionando correctamente.

## Pre-requisitos ✓

- [ ] Node.js instalado (v14+)
  - Verificar: `node --version`
- [ ] MongoDB instalado
  - Verificar: `mongod --version`
- [ ] Git instalado
  - Verificar: `git --version`

## Instalación ✓

- [ ] Ejecutado `npm run install:all`
  - Debe instalar dependencias en raíz y backend
- [ ] Creado archivo `.env` en `backend/`
  - Verificar que exista `backend/.env`
  - Cambiar `JWT_SECRET` si es necesario

## MongoDB ✓

- [ ] MongoDB corriendo
  - Ejecutar: `mongod`
  - Verificar en terminal que diga "waiting for connections on port 27017"
- [ ] Conexión funcionando
  - Probar: `mongosh`
  - Debe conectar sin errores

## Usuario Admin ✓

- [ ] Crear usuario admin
  - Ejecutar: `cd backend` y luego `npm run create-admin`
  - Ingresar username y password personalizados
  - Guardar credenciales en lugar seguro
- [ ] Verificar creación
  - En `mongosh`:
    ```javascript
    use portfolio
    db.users.find()
    ```
  - Debe mostrar 1 usuario

## Backend API ✓

- [ ] Backend iniciado
  - Ejecutar: `cd backend` y `npm run dev`
  - Debe mostrar "✅ MongoDB conectado"
  - Debe mostrar "🚀 Servidor corriendo en http://localhost:5000"
- [ ] Probar endpoint raíz
  - Abrir: http://localhost:5000
  - Debe mostrar JSON con mensaje de bienvenida
- [ ] Probar endpoint de proyectos
  - Abrir: http://localhost:5000/api/projects
  - Debe mostrar array vacío `[]`

## Frontend Público ✓

- [ ] Abrir con Live Server
  - Click derecho en `frontend/index.html`
  - Seleccionar "Open with Live Server"
  - O abrir directamente en navegador
- [ ] Verificar carga
  - Debe cargar sin errores en consola
  - Mensaje de "No hay proyectos" es normal si no hay proyectos creados

## Panel Admin ✓

- [ ] Abrir login
  - Click derecho en `admin/login.html`
  - Seleccionar "Open with Live Server"
- [ ] Iniciar sesión
  - Ingresar credenciales creadas anteriormente
  - Debe redirigir a dashboard
- [ ] Dashboard carga
  - Debe mostrar "No tenés proyectos aún" si es primera vez
  - Botón "Nuevo Proyecto" debe funcionar

## Crear Proyecto de Prueba ✓

- [ ] Click en "Nuevo Proyecto"
- [ ] Completar formulario:
  - Título: "Proyecto de Prueba"
  - Problema: "Descripción del problema"
  - Solución: "Descripción de la solución"
  - Resultado: "Resultado obtenido"
  - Tecnologías: "React, Node.js"
  - Estado: Seleccionar uno
  - Categoría: Seleccionar una
  - Publicado: Dejar marcado
- [ ] Guardar proyecto
  - Debe aparecer en la lista del dashboard
- [ ] Verificar en frontend
  - Recargar `frontend/index.html`
  - El proyecto debe aparecer en la sección de proyectos

## Verificación de Archivos ✓

- [ ] Backend tiene carpeta `uploads/`
- [ ] Backend tiene archivo `.env`
- [ ] Backend tiene archivo `.env.example`
- [ ] Raíz tiene `.gitignore` actualizado
- [ ] Raíz tiene `PROBLEMAS-CORREGIDOS.md`
- [ ] Raíz tiene `INICIO-RAPIDO-CORREGIDO.md`

## Puertos Correctos ✓

- [ ] Backend: Puerto 5000
  - Verificar en `backend/server.js`
  - Verificar en `backend/.env`
- [ ] Frontend API_URL: `http://localhost:5000/api`
  - Verificar en `frontend/app.js`
- [ ] Admin API_URL: `http://localhost:5000/api`
  - Verificar en `admin/dashboard.js`
  - Verificar en `admin/login.js`

## Funcionalidades del Admin ✓

- [ ] Crear proyecto funciona
- [ ] Editar proyecto funciona
- [ ] Eliminar proyecto funciona
- [ ] Toggle publicado funciona
- [ ] Logout funciona
- [ ] Login después de logout funciona

## Errores Comunes y Soluciones ✓

### ❌ "Cannot connect to MongoDB"
**Solución:** Ejecutar `mongod` en otra terminal

### ❌ "Cannot GET /api/projects"
**Solución:** Verificar que backend esté corriendo en puerto 5000

### ❌ "401 Unauthorized"
**Solución:** Token expirado, hacer logout y login nuevamente

### ❌ "Network Error" en admin
**Solución:** Verificar que API_URL sea `http://localhost:5000/api`

### ❌ "No projects showing in frontend"
**Solución:** Crear al menos 1 proyecto publicado en el admin

---

## ✅ Todo Verificado

Si todos los checks están marcados, el portfolio está funcionando correctamente.

**Próximos pasos:**
1. Personalizar el diseño según tus preferencias
2. Agregar tus proyectos reales
3. Preparar para deployment (ver `DEPLOYMENT.md`)

---

**Fecha:** Noviembre 2025
**Versión:** 1.0 (Corregida)
