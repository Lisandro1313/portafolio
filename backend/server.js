const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mensaje de inicio
console.log('✅ Sistema de archivos JSON listo');

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({
        message: 'Backend Portfolio API funcionando correctamente',
        endpoints: {
            auth: '/api/auth',
            projects: '/api/projects'
        }
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
