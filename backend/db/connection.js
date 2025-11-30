const { Pool } = require('pg');

// HARDCODED: Forzar Supabase ignorando variables de Render
const connectionString = process.env.SUPABASE_URL || 
                        'postgresql://postgres:Cocoliso13!@db.bqlppayfgsepdrepenxt.supabase.co:5432/postgres';

console.log('🔗 Conectando a Supabase:', connectionString.includes('supabase') ? 'SI ✅' : 'NO ❌');
console.log('📍 Host:', connectionString.split('@')[1]?.split('/')[0] || 'desconocido');

const pool = new Pool({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
});

// Test de conexión
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Error conectando a PostgreSQL:', err.message);
    } else {
        console.log('✅ PostgreSQL conectado exitosamente a Supabase');
        console.log('📍 Timestamp del servidor:', res.rows[0].now);
    }
});

module.exports = pool;



