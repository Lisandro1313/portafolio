const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Servir archivos estáticos del frontend en producción
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend')));
    app.use('/admin', express.static(path.join(__dirname, '../admin')));
}

// Mensaje de inicio
console.log('✅ Sistema de archivos JSON listo');

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/analytics', require('./routes/analytics'));

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({
        message: 'Backend Portfolio API funcionando correctamente',
        endpoints: {
            auth: '/api/auth',
            projects: '/api/projects',
            analytics: '/api/analytics'
        }
    });
});

// Servir frontend en producción
if (process.env.NODE_ENV === 'production') {
    app.get('/admin/*', (req, res) => {
        res.sendFile(path.join(__dirname, '../admin', req.path.replace('/admin', '')));
    });
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
