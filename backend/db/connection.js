const { Pool } = require('pg');

// Usar el POOLER de Supabase (puerto 6543) en lugar de session mode (5432)
console.log('🔗 Conectando a Supabase Transaction Pooler (IPv4 compatible)');
console.log('📍 Host: aws-0-sa-east-1.pooler.supabase.com:6543');

// Crear pool con configuración explícita usando POOLER
const pool = new Pool({
    host: 'aws-0-sa-east-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    user: 'postgres.bqlppayfgsepdrepenxt',
    password: 'Cocoliso13!',
    ssl: {
        rejectUnauthorized: false
    },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000
});

// Test de conexión
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Error conectando a Supabase:', err.message);
        console.error('❌ Código de error:', err.code);
    } else {
        console.log('✅ PostgreSQL conectado exitosamente a Supabase Pooler');
        console.log('📍 Timestamp del servidor:', res.rows[0].now);
    }
});

module.exports = pool;





