const { Pool } = require('pg');

// Forzar usar DATABASE_URL de Supabase ignorando otras variables
const connectionString = process.env.DATABASE_URL;

console.log('🔗 Intentando conectar a:', connectionString ? connectionString.split('@')[1] : 'NO CONFIGURADA');

const pool = new Pool({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
});

// Test de conexión
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Error conectando a PostgreSQL:', err);
        console.error('📍 Connection string:', connectionString ? 'configurada' : 'NO configurada');
    } else {
        console.log('✅ PostgreSQL conectado exitosamente');
        console.log('📍 Servidor:', res.rows[0].now);
    }
});

module.exports = pool;

