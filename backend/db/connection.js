const { Pool } = require('pg');

// HARDCODED: Forzar Supabase ignorando variables de Render
const SUPABASE_CONNECTION = 'postgresql://postgres:Cocoliso13!@db.bqlppayfgsepdrepenxt.supabase.co:5432/postgres';

console.log('🔗 Conectando a Supabase hardcodeado');
console.log('📍 Host: db.bqlppayfgsepdrepenxt.supabase.co:5432');

// Crear pool con configuración explícita
const pool = new Pool({
    host: 'db.bqlppayfgsepdrepenxt.supabase.co',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
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
        console.log('✅ PostgreSQL conectado exitosamente a Supabase');
        console.log('📍 Timestamp del servidor:', res.rows[0].now);
    }
});

module.exports = pool;




