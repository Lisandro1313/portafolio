# 🎨 PERSONALIZACIÓN DE TU PORTFOLIO

Guía rápida para personalizar los elementos clave de tu portfolio.

---

## 📧 1. CAMBIAR DATOS DE CONTACTO

### Ubicación: `frontend/index.html`

### Líneas: ~154-164

**Buscar:**

```html
<a href="mailto:tu-email@ejemplo.com" class="btn btn-contact"> 📧 Email </a>
<a
  href="https://linkedin.com/in/tu-perfil"
  target="_blank"
  class="btn btn-contact"
>
  💼 LinkedIn
</a>
<a href="https://wa.me/tunumero" target="_blank" class="btn btn-contact">
  📱 WhatsApp
</a>
```

**Cambiar a tus datos:**

```html
<a href="mailto:tunombre@gmail.com" class="btn btn-contact"> 📧 Email </a>
<a
  href="https://linkedin.com/in/tu-perfil-real"
  target="_blank"
  class="btn btn-contact"
>
  💼 LinkedIn
</a>
<a href="https://wa.me/5491112345678" target="_blank" class="btn btn-contact">
  📱 WhatsApp
</a>
```

---

## 👤 2. PERSONALIZAR NOMBRE/MARCA

### Ubicación: `frontend/index.html`

### Línea: ~22

**Buscar:**

```html
<div class="logo">DEV</div>
```

**Cambiar a:**

```html
<div class="logo">TU NOMBRE</div>
```

O tu inicial, marca personal, etc.

---

## 🔐 3. CAMBIAR CONTRASEÑA DE ADMIN

### Opción A: Desde el código (antes del primer login)

Editar: `backend/createAdmin.js`

Cambiar línea 28:

```javascript
const hashedPassword = await bcrypt.hash("NUEVA_CONTRASEÑA", salt);
```

Luego ejecutar:

```powershell
cd backend
npm run create-admin
```

### Opción B: Crear endpoint para cambiar contraseña

Agregar en `backend/routes/auth.js`:

```javascript
// Cambiar contraseña (requiere autenticación)
router.put("/change-password", auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    // Verificar contraseña actual
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña actual incorrecta" });
    }

    // Actualizar contraseña
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: "Contraseña actualizada exitosamente" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error del servidor");
  }
});
```

---

## 🎨 4. CAMBIAR COLORES DEL TEMA

### Ubicación: `frontend/style.css`

### Líneas: 9-20

**Variables de color actuales:**

```css
:root {
  /* Colores Neón GTA 6 */
  --neon-pink: #ff006e; /* Rosa neón */
  --neon-purple: #8338ec; /* Violeta */
  --neon-cyan: #06ffa5; /* Cyan/Verde */
  --neon-blue: #3a86ff; /* Azul */
  --dark-bg: #0d0221; /* Fondo oscuro */
  --dark-card: #1a0a3e; /* Cards oscuras */
}
```

**Cambiá estos valores** para personalizar tu paleta de colores.

Ejemplos:

### Estilo Cyberpunk Amarillo/Azul

```css
--neon-pink: #ffff00; /* Amarillo */
--neon-purple: #00fff9; /* Cyan claro */
--neon-cyan: #ff00ff; /* Magenta */
```

### Estilo Matrix Verde

```css
--neon-pink: #00ff41; /* Verde brillante */
--neon-purple: #00ff41; /* Verde brillante */
--neon-cyan: #00ff41; /* Verde brillante */
```

### Estilo Retro Miami

```css
--neon-pink: #ff6ec7; /* Rosa pastel */
--neon-purple: #c77dff; /* Lavanda */
--neon-cyan: #7df9ff; /* Celeste */
```

---

## 📝 5. PERSONALIZAR TEXTOS DE LA PORTADA

### Ubicación: `frontend/index.html`

### Líneas: 38-50

**Cambiar título principal:**

```html
<h1 class="glitch" data-text="TU MENSAJE AQUÍ">TU MENSAJE AQUÍ</h1>
```

**Cambiar subtítulo:**

```html
<p class="hero-subtitle">Tus especialidades • Separadas • Por puntos</p>
```

**Cambiar descripción:**

```html
<p class="hero-description">Tu mensaje de presentación personal aquí.</p>
```

---

## 🖼️ 6. AGREGAR TU FOTO DE PERFIL

### Opción A: En la sección "Sobre Mí"

Editar `frontend/index.html`, agregar después de la línea ~60:

```html
<div class="about-content">
  <div class="about-image">
    <img src="tu-foto.jpg" alt="Tu Nombre" />
  </div>
  <div class="about-text">
    <!-- Texto existente -->
  </div>
</div>
```

Agregar en `frontend/style.css`:

```css
.about-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 3rem;
  align-items: start;
}

.about-image img {
  width: 100%;
  border-radius: 20px;
  border: 3px solid var(--neon-cyan);
  box-shadow: 0 0 30px rgba(6, 255, 165, 0.4);
}
```

---

## 🌐 7. AGREGAR TU DOMINIO PERSONALIZADO

Cuando publiques tu portfolio en internet:

### En Netlify/Vercel:

1. Comprá un dominio (ej: tunombre.com)
2. En la configuración del hosting, agregá tu dominio
3. Actualizá las DNS según las instrucciones

### Actualizar URLs en el código:

En producción, cambiar en:

- `frontend/app.js`
- `admin/login.js`
- `admin/dashboard.js`

De:

```javascript
const API_URL = "http://localhost:5001/api";
```

A:

```javascript
const API_URL = "https://api.tudominio.com/api";
```

---

## 📱 8. AGREGAR MÁS REDES SOCIALES

En `frontend/index.html`, sección de contacto:

```html
<a href="https://github.com/tuusuario" target="_blank" class="btn btn-contact">
  💻 GitHub
</a>
<a href="https://twitter.com/tuusuario" target="_blank" class="btn btn-contact">
  🐦 Twitter
</a>
<a
  href="https://instagram.com/tuusuario"
  target="_blank"
  class="btn btn-contact"
>
  📸 Instagram
</a>
```

---

## 🎯 9. CAMBIAR TÍTULO DE LA PESTAÑA

### Ubicación: `frontend/index.html`

### Línea: 6

```html
<title>Tu Nombre | Full Stack Developer</title>
```

### Ubicación: `admin/login.html`

### Línea: 6

```html
<title>Panel Admin | Tu Nombre</title>
```

---

## ⚡ 10. AGREGAR GOOGLE ANALYTICS (OPCIONAL)

En `frontend/index.html`, antes de `</head>`:

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=TU-ID-AQUI"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "TU-ID-AQUI");
</script>
```

---

## 🚀 PRÓXIMOS PASOS DESPUÉS DE PERSONALIZAR

1. ✅ Probá que todo funcione localmente
2. ✅ Subí tu código a GitHub
3. ✅ Publicá en Netlify/Vercel (frontend)
4. ✅ Publicá en Railway/Render (backend)
5. ✅ Compartí tu portfolio en LinkedIn
6. ✅ Agregá el link a tu CV

---

¡Tu portfolio está listo para destacar! 🎉
