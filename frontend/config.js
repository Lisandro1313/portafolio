// Configuración de API - Detecta automáticamente el entorno
const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api'
    : '/api';

// Cargar proyectos desde el backend