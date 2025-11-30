const { Pool } = require('pg');

// Usar el POOLER de Supabase (puerto 6543) en lugar de session mode (5432)
console.log('🔗 Conectando a Supabase Transaction Pooler (IPv4 compatible)');
console.log('📍 Connection string format');

// CONNECTION STRING con nueva password de Supabase
const connectionString = 'postgresql://postgres.bqlppayfgsepdrepenxt:sQVCM3x98V197hTp@aws-0-us-west-2.pooler.supabase.com:6543/postgres';

// Crear pool con connection string completo
const pool = new Pool({
    connectionString: connectionString,
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





