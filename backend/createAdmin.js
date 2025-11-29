const bcrypt = require('bcryptjs');
const readline = require('readline');
require('dotenv').config();

const User = require('./models/User');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => {
    return new Promise((resolve) => {
        rl.question(query, resolve);
    });
};

const createAdminUser = async () => {
    try {
        console.log('✅ Sistema de archivos JSON listo');
        console.log('');

        // Verificar si ya existe un usuario
        const existingUserCount = await User.countDocuments();

        if (existingUserCount > 0) {
            console.log('⚠️  Ya existe un usuario administrador en la base de datos');
            console.log('');
            const answer = await question('¿Querés eliminar el usuario existente y crear uno nuevo? (s/n): ');
            
            if (answer.toLowerCase() !== 's') {
                console.log('Operación cancelada');
                rl.close();
                process.exit(0);
            }

            await User.deleteMany({});
            console.log('✅ Usuario anterior eliminado');
            console.log('');
        }

        // Pedir credenciales
        console.log('=== Crear Usuario Administrador ===');
        console.log('');
        const username = await question('Ingresá el nombre de usuario: ');
        const password = await question('Ingresá la contraseña: ');

        if (!username || !password) {
            console.log('❌ Usuario y contraseña son requeridos');
            rl.close();
            process.exit(1);
        }

        if (password.length < 6) {
            console.log('❌ La contraseña debe tener al menos 6 caracteres');
            rl.close();
            process.exit(1);
        }

        // Crear usuario admin
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const adminUser = await User.create({
            username: username,
            password: hashedPassword
        });

        console.log('');
        console.log('✅ Usuario administrador creado exitosamente');
        console.log('');
        console.log('Credenciales:');
        console.log(`  Usuario: ${username}`);
        console.log(`  Contraseña: ${password}`);
        console.log('');
        console.log('⚠️  Guardá estas credenciales en un lugar seguro');
        console.log('');

        rl.close();
        process.exit(0);

    } catch (error) {
        console.error('❌ Error:', error.message);
        rl.close();
        process.exit(1);
    }
};

createAdminUser();
