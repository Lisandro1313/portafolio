# 💻 TRABAJAR EN OTRA PC

Guía para clonar y usar tu portfolio en cualquier computadora.

---

## 🚀 PRIMERA VEZ EN OTRA PC

### 1️⃣ Requisitos Previos

Asegurate de tener instalado:

- ✅ **Node.js** (https://nodejs.org/)
- ✅ **Git** (https://git-scm.com/)

---

### 2️⃣ Clonar el Repositorio

Abrí PowerShell y ejecutá:

```powershell
cd Desktop
git clone https://github.com/Lisandro1313/portafolio.git
cd portafolio
```

---

### 3️⃣ Instalar Dependencias

```powershell
npm run install:all
```

Esto instala todas las dependencias del proyecto (backend, frontend, admin).

---

### 4️⃣ Configurar Base de Datos

**IMPORTANTE:** Usá MongoDB Atlas (en la nube) para que funcione en todas tus PCs sin tener que instalar nada.

#### Crear MongoDB Atlas:

1. **Ir a:** https://www.mongodb.com/cloud/atlas/register
2. **Crear cuenta gratis**
3. **Crear cluster gratuito** (M0)
4. **Crear usuario de base de datos:**
   - Username: `admin`
   - Password: (la que quieras)
5. **Permitir todas las IPs:**
   - Network Access → Add IP → `0.0.0.0/0`
6. **Obtener connection string:**
   - Connect → Connect your application
   - Copiar el string

#### Configurar en tu proyecto:

Editar `backend/.env` y poner tu connection string:

```env
MONGODB_URI=mongodb+srv://admin:TU_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=tu_clave_secreta_super_segura
PORT=5001
NODE_ENV=development
```

---

### 5️⃣ Crear Usuario Admin (Solo Primera Vez)

```powershell
cd backend
npm run create-admin
```

Esto crea el usuario `admin` con contraseña `admin123`

---

### 6️⃣ Iniciar el Proyecto

```powershell
cd backend
node server.js
```

Dejá esa terminal abierta.

En tu navegador abrí:

- **Portfolio:** `frontend/index.html`
- **Panel Admin:** `admin/login.html`

**Login:** admin / admin123

---

## 🔄 TRABAJAR TODOS LOS DÍAS

### Cuando inicies tu PC:

```powershell
cd portafolio/backend
node server.js
```

Abrí en el navegador:

- `frontend/index.html`
- `admin/login.html`

---

## 📤 SUBIR CAMBIOS A GITHUB

Cuando hagas modificaciones:

```powershell
git add .
git commit -m "Descripción de lo que cambiaste"
git push
```

---

## 📥 DESCARGAR CAMBIOS (En Otra PC)

Antes de empezar a trabajar:

```powershell
cd portafolio
git pull
```

Esto trae los últimos cambios que hiciste en otra PC.

---

## 🔥 FLUJO DE TRABAJO COMPLETO

### En PC 1:

```powershell
cd portafolio
git pull                    # Traer cambios
# Trabajar en tu proyecto
git add .
git commit -m "Agregué nuevo proyecto"
git push                    # Subir cambios
```

### En PC 2:

```powershell
cd portafolio
git pull                    # ¡Aparecen los cambios de PC 1!
# Seguir trabajando
git add .
git commit -m "Cambié colores"
git push
```

### De vuelta en PC 1:

```powershell
git pull                    # ¡Aparecen los cambios de PC 2!
```

---

## ⚠️ IMPORTANTE

### Nunca Subas a GitHub:

- ❌ `.env` (ya está en .gitignore)
- ❌ `node_modules/` (ya está en .gitignore)
- ❌ Contraseñas o datos sensibles

### Siempre Hacé:

- ✅ `git pull` antes de empezar a trabajar
- ✅ `git push` después de terminar
- ✅ Commits descriptivos

---

## 🆘 PROBLEMAS COMUNES

### "Cannot connect to MongoDB"

- Verificá que el string de MongoDB Atlas esté bien en `backend/.env`
- Verificá que tengas internet (MongoDB Atlas necesita conexión)

### "Port 5001 already in use"

- Cerrá otras instancias del backend
- O cambiá el puerto en `backend/.env`

### "Git conflict"

Si hay conflictos al hacer pull:

```powershell
git stash              # Guardar cambios temporalmente
git pull               # Traer cambios
git stash pop          # Recuperar tus cambios
# Resolver conflictos manualmente
git add .
git commit -m "Resuelto conflicto"
git push
```

---

## 📝 RESUMEN RÁPIDO

**Primera vez:**

```powershell
git clone https://github.com/Lisandro1313/portafolio.git
cd portafolio
npm run install:all
# Configurar .env con MongoDB Atlas
cd backend
npm run create-admin
```

**Todos los días:**

```powershell
git pull
cd backend
node server.js
# Trabajar
git add .
git commit -m "Descripción"
git push
```

---

¡Ya podés trabajar en tu portfolio desde cualquier PC! 🎉
