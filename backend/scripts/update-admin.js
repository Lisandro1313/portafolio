const bcrypt = require('bcryptjs');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

async function updateAdminCredentials() {
    // Generar nueva contraseña segura
    const newPassword = crypto.randomBytes(12).toString('base64').slice(0, 16);
    
    console.log('\n🔐 NUEVAS CREDENCIALES DE ADMIN:\n');
    console.log('Usuario: admin');
    console.log(`Contraseña: ${newPassword}`);
    console.log('\n⚠️  GUARDA ESTAS CREDENCIALES EN UN LUGAR SEGURO!\n');
    
    // Hashear contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Actualizar archivo users.json
    const usersFile = path.join(__dirname, '../data/users.json');
    const users = [{
        _id: '1',
        username: 'admin',
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date().toISOString()
    }];
    
    await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
    
    console.log('✅ Credenciales actualizadas en backend/data/users.json\n');
    console.log('📝 Ahora ejecutá: git add . && git commit -m "Actualizar credenciales admin" && git push\n');
}

updateAdminCredentials().catch(console.error);
