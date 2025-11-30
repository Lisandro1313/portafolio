const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

// Registrar visita
router.post('/visits/register', async (req, res) => {
    try {
        const { ip, country = 'AR', countryFlag = '🇦🇷', userAgent = '' } = req.body;

        const sql = `
            INSERT INTO visits (ip, country, country_flag, user_agent)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;

        await pool.query(sql, [ip, country, countryFlag, userAgent]);

        // Obtener total de visitas
        const countResult = await pool.query('SELECT COUNT(*) as total FROM visits');
        const totalVisits = parseInt(countResult.rows[0].total) || 0;

        res.json({ 
            success: true, 
            visitCount: totalVisits 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            visitCount: 0,
            error: error.message 
        });
    }
});

// Obtener estadísticas
router.get('/visits/stats', async (req, res) => {
    try {
        // Total de visitas
        const totalResult = await pool.query('SELECT COUNT(*) as total FROM visits');
        const totalVisits = parseInt(totalResult.rows[0].total) || 0;

        // Visitas únicas (IPs únicas)
        const uniqueResult = await pool.query('SELECT COUNT(DISTINCT ip) as unique_ips FROM visits');
        const uniqueVisits = parseInt(uniqueResult.rows[0].unique_ips) || 0;

        // Visitas por país
        const countriesResult = await pool.query(`
            SELECT country, country_flag, COUNT(*) as count
            FROM visits
            GROUP BY country, country_flag
            ORDER BY count DESC
        `);

        const countries = countriesResult.rows.map(row => ({
            country: row.country,
            flag: row.country_flag,
            count: parseInt(row.count)
        }));

        // Últimas 10 visitas
        const recentResult = await pool.query(`
            SELECT ip, country, country_flag, user_agent, visited_at
            FROM visits
            ORDER BY visited_at DESC
            LIMIT 10
        `);

        const recentVisits = recentResult.rows.map(row => ({
            ip: row.ip,
            country: row.country,
            flag: row.country_flag,
            userAgent: row.user_agent,
            timestamp: row.visited_at
        }));

        res.json({
            totalVisits,
            uniqueVisits,
            countries,
            recentVisits
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message,
            totalVisits: 0,
            uniqueVisits: 0,
            countries: [],
            recentVisits: []
        });
    }
});

// Exportar visitas a CSV
router.get('/visits/export', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT ip, country, country_flag, user_agent, visited_at
            FROM visits
            ORDER BY visited_at DESC
        `);

        const visits = result.rows;

        const csv = [
            'IP,País,Bandera,Navegador,Fecha',
            ...visits.map(v => 
                `${v.ip},${v.country},${v.country_flag},"${v.user_agent}",${v.visited_at}`
            )
        ].join('\n');

        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename=visitas.csv');
        res.send('\ufeff' + csv);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

// Obtener conteo de visitas
router.get('/visits/count', async (req, res) => {
    try {
        const data = await fs.readFile(VISITS_FILE, 'utf8');
        const visitsData = JSON.parse(data);
        res.json({ totalVisits: visitsData.totalVisits });
    } catch (error) {
        console.error('Error al leer visitas:', error);
        res.json({ totalVisits: 150 }); // Valor por defecto
    }
});

// Registrar nueva visita
router.post('/visits/register', async (req, res) => {
    try {
        // Obtener IP del visitante
        const ip = req.headers['x-forwarded-for']?.split(',')[0] ||
            req.socket.remoteAddress ||
            'unknown';

        // Leer archivo de visitas
        let visitsData = { totalVisits: 150, visitors: [] };
        try {
            const data = await fs.readFile(VISITS_FILE, 'utf8');
            visitsData = JSON.parse(data);
        } catch (error) {
            console.log('Creando archivo de visitas...');
        }

        // Incrementar contador
        visitsData.totalVisits += 1;

        // Registrar visitante con datos
        const visitor = {
            ip: ip,
            timestamp: new Date().toISOString(),
            userAgent: req.headers['user-agent'] || 'unknown',
            country: 'AR', // Por defecto Argentina, se puede mejorar con un servicio de geolocalización
            countryFlag: '🇦🇷'
        };

        visitsData.visitors.unshift(visitor); // Agregar al inicio

        // GUARDAR TODAS LAS VISITAS - Sin límite
        // (Comentado el límite de 1000)
        // if (visitsData.visitors.length > 1000) {
        //     visitsData.visitors = visitsData.visitors.slice(0, 1000);
        // }

        // Guardar archivo
        await fs.writeFile(VISITS_FILE, JSON.stringify(visitsData, null, 2));

        res.json({
            success: true,
            totalVisits: visitsData.totalVisits,
            visitor
        });
    } catch (error) {
        console.error('Error al registrar visita:', error);
        res.status(500).json({ error: 'Error al registrar visita' });
    }
});

// Obtener todas las visitas (para admin)
router.get('/visits/all', async (req, res) => {
    try {
        const data = await fs.readFile(VISITS_FILE, 'utf8');
        const visitsData = JSON.parse(data);
        res.json(visitsData);
    } catch (error) {
        console.error('Error al leer visitas:', error);
        res.status(500).json({ error: 'Error al leer visitas' });
    }
});

// Obtener estadísticas de visitas
router.get('/visits/stats', async (req, res) => {
    try {
        let visitsData = { totalVisits: 150, visitors: [] };

        try {
            const data = await fs.readFile(VISITS_FILE, 'utf8');
            visitsData = JSON.parse(data);
        } catch (error) {
            console.log('Archivo de visitas no existe aún, usando valores por defecto');
        }

        // Contar visitas por país
        const byCountry = {};
        if (visitsData.visitors && Array.isArray(visitsData.visitors)) {
            visitsData.visitors.forEach(v => {
                const country = v.country || 'unknown';
                byCountry[country] = (byCountry[country] || 0) + 1;
            });
        }

        // Visitas recientes (últimas 24 horas)
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const recent = visitsData.visitors && Array.isArray(visitsData.visitors)
            ? visitsData.visitors.filter(v => new Date(v.timestamp) > oneDayAgo)
            : [];

        res.json({
            totalVisits: visitsData.totalVisits || 150,
            totalRecorded: visitsData.visitors ? visitsData.visitors.length : 0,
            last24Hours: recent.length,
            byCountry,
            recentVisitors: visitsData.visitors ? visitsData.visitors.slice(0, 10) : []
        });
    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        res.status(500).json({
            error: 'Error al obtener estadísticas',
            totalVisits: 150,
            totalRecorded: 0,
            last24Hours: 0,
            byCountry: {},
            recentVisitors: []
        });
    }
});

// Descargar todas las visitas en CSV
router.get('/visits/export', async (req, res) => {
    try {
        const data = await fs.readFile(VISITS_FILE, 'utf8');
        const visitsData = JSON.parse(data);

        // Crear CSV
        let csv = 'Fecha,Hora,IP,País,Navegador\n';

        if (visitsData.visitors && Array.isArray(visitsData.visitors)) {
            visitsData.visitors.forEach(v => {
                const date = new Date(v.timestamp);
                const dateStr = date.toLocaleDateString('es-AR');
                const timeStr = date.toLocaleTimeString('es-AR');
                const browser = v.userAgent ? v.userAgent.split(' ')[0] : 'Unknown';

                csv += `${dateStr},${timeStr},"${v.ip}","${v.country || 'Unknown'}","${browser}"\n`;
            });
        }

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=visitas.csv');
        res.send(csv);
    } catch (error) {
        console.error('Error al exportar visitas:', error);
        res.status(500).json({ error: 'Error al exportar visitas' });
    }
});

module.exports = router;
