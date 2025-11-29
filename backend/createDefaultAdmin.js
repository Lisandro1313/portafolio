const bcrypt = require('bcryptjs');
const fs = require('fs').promises;
const path = require('path');

const createDefaultAdmin = async () => {
    try {
        const usersFile = path.join(__dirname, 'data', 'users.json');
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);
        
        const admin = {
            _id: Date.now().toString(),
            id: Date.now().toString(),
            username: 'admin',
            password: hashedPassword,
            createdAt: new Date()
        };
        
        await fs.writeFile(usersFile, JSON.stringify([admin], null, 2));
        
        console.log('✅ Usuario admin creado');
        console.log('');
        console.log('Credenciales:');
        console.log('  Usuario: admin');
        console.log('  Contraseña: admin123');
        console.log('');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
};

createDefaultAdmin();
