const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

// Leer DATABASE_URL del .env
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function initDatabase() {
    console.log('\n🔧 Inicializando base de datos PostgreSQL...\n');

    try {
        // Leer el archivo SQL
        const sqlFile = path.join(__dirname, '../db/setup.sql');
        const sql = fs.readFileSync(sqlFile, 'utf8');

        // Ejecutar el SQL
        await pool.query(sql);

        console.log('✅ Tablas creadas correctamente');
        console.log('✅ Índices creados');

        console.log('\n📋 Tablas disponibles:');
        console.log('  - users');
        console.log('  - projects');
        console.log('  - visits');

        console.log('\n💡 Siguiente paso: Crear usuario admin');
        console.log('   Ejecuta: node scripts/create-admin-postgres.js\n');

        await pool.end();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error inicializando base de datos:', error.message);
        await pool.end();
        process.exit(1);
    }
}

initDatabase();
