const bcrypt = require('bcryptjs');
const pool = require('../db/connection');

async function createAdmin() {
    try {
        // Generar contraseña segura
        const password = process.argv[2] || '3QHM/EZI5PMWyny3';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const sql = `
            INSERT INTO users (username, password, role)
            VALUES ($1, $2, $3)
            ON CONFLICT (username) DO UPDATE
            SET password = EXCLUDED.password
            RETURNING username, created_at
        `;
        
        const result = await pool.query(sql, ['admin', hashedPassword, 'admin']);
        
        console.log('\n✅ Usuario admin creado/actualizado:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Username:', result.rows[0].username);
        console.log('Password:', password);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        await pool.end();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        await pool.end();
        process.exit(1);
    }
}

createAdmin();
