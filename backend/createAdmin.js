const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');

const createAdminUser = async () => {
    try {
        // Conectar a MongoDB
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('✅ Conectado a MongoDB');        // Verificar si ya existe un usuario
        const existingUser = await User.findOne({ username: 'admin' });

        if (existingUser) {
            console.log('⚠️  Ya existe un usuario admin');
            console.log('Si querés crear uno nuevo, primero eliminá el actual desde MongoDB');
            process.exit(0);
        }

        // Crear usuario admin
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        const adminUser = new User({
            username: 'admin',
            password: hashedPassword
        });

        await adminUser.save();

        console.log('');
        console.log('✅ Usuario administrador creado exitosamente');
        console.log('');
        console.log('Credenciales:');
        console.log('  Usuario: admin');
        console.log('  Contraseña: admin123');
        console.log('');
        console.log('⚠️  IMPORTANTE: Cambiá estas credenciales después del primer login');
        console.log('');

        process.exit(0);

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

createAdminUser();
