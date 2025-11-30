const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route   GET api/auth/setup
// @desc    Crear usuario admin automáticamente (SOLO SI NO EXISTE)
// @access  Public
router.get('/setup', async (req, res) => {
    try {
        // Verificar si ya existe un admin
        const userCount = await User.countDocuments();
        if (userCount >= 1) {
            return res.json({
                success: false,
                message: 'Ya existe un usuario administrador'
            });
        }

        // Crear admin con credenciales predefinidas
        const username = 'admin';
        const password = '3QHM/EZI5PMWyny3';

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear usuario
        await User.create({
            username,
            password: hashedPassword,
            role: 'admin'
        });

        res.json({
            success: true,
            message: '✅ Usuario admin creado exitosamente',
            credentials: {
                username: 'admin',
                password: '3QHM/EZI5PMWyny3'
            }
        });
    } catch (err) {
        console.error('Error en setup:', err.message);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// @route   GET api/auth/reset-admin
// @desc    Resetear contraseña del admin (USAR SOLO CUANDO OLVIDES LA CONTRASEÑA)
// @access  Public (ELIMINAR ESTE ENDPOINT DESPUÉS DE USAR)
router.get('/reset-admin', async (req, res) => {
    try {
        const username = 'admin';
        const newPassword = '3QHM/EZI5PMWyny3';

        // Encriptar nueva contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Actualizar contraseña en la base de datos
        const pool = require('../db/connection');
        const result = await pool.query(
            'UPDATE users SET password = $1 WHERE username = $2 RETURNING username',
            [hashedPassword, username]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Usuario admin no encontrado'
            });
        }

        res.json({
            success: true,
            message: '✅ Contraseña del admin reseteada exitosamente',
            credentials: {
                username: 'admin',
                password: '3QHM/EZI5PMWyny3'
            }
        });
    } catch (err) {
        console.error('Error reseteando contraseña:', err.message);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// @route   POST api/auth/register
// @desc    Crear usuario admin (usar solo una vez)
// @access  Public (cambiar a private en producción)
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Verificar si el usuario ya existe
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Verificar que no haya más de un usuario (solo admin)
        const userCount = await User.countDocuments();
        if (userCount >= 1) {
            return res.status(403).json({ message: 'Ya existe un usuario administrador' });
        }

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await User.create({
            username,
            password: hashedPassword,
            role: 'admin'
        });

        // Crear token
        const payload = {
            user: { id: username }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '24h' },
            (err, token) => {
                if (err) {
                    console.error('Error generando token:', err);
                    return res.status(500).json({ message: 'Error generando token' });
                }
                res.json({ token, message: 'Usuario admin creado exitosamente' });
            }
        );
    } catch (err) {
        console.error('Error en register:', err.message);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    }
});

// @route   POST api/auth/login
// @desc    Autenticar usuario y obtener token
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Verificar si el usuario existe
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // Verificar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // Crear token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '24h' },
            (err, token) => {
                if (err) {
                    console.error('Error generando token:', err);
                    return res.status(500).json({ message: 'Error generando token' });
                }
                res.json({
                    token,
                    user: {
                        id: user.id,
                        username: user.username
                    },
                    message: 'Login exitoso'
                });
            }
        );
    } catch (err) {
        console.error('Error en login:', err.message);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    }
});

module.exports = router;
