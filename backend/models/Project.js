const pool = require('../db/connection');

class Project {
    // Crear proyecto
    static async create(projectData) {
        const {
            title,
            problem,
            solution,
            result,
            technologies = [],
            status = 'En producción',
            category = 'Web',
            videoUrl = '',
            published = true
        } = projectData;

        const sql = `
            INSERT INTO projects (title, problem, solution, result, technologies, status, category, video_url, published)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *
        `;

        const tech = Array.isArray(technologies) ? technologies.join(',') : technologies;

        const result_db = await pool.query(sql, [
            title,
            problem,
            solution,
            result,
            tech,
            status,
            category,
            videoUrl,
            published
        ]);

        const project = result_db.rows[0];
        project.technologies = project.technologies ? project.technologies.split(',') : [];
        project._id = project.id.toString(); // Compatibilidad con frontend
        project.videoUrl = project.video_url; // Mapear snake_case a camelCase
        return project;
    }

    // Obtener todos los proyectos
    static async find(query = {}) {
        let sql = 'SELECT * FROM projects';
        const params = [];

        if (query.published !== undefined) {
            sql += ' WHERE published = $1';
            params.push(query.published);
        }

        sql += ' ORDER BY created_at DESC';

        const result = await pool.query(sql, params);

        return result.rows.map(project => ({
            ...project,
            _id: project.id.toString(), // Compatibilidad con frontend
            videoUrl: project.video_url, // Mapear snake_case a camelCase
            technologies: project.technologies ? project.technologies.split(',') : []
        }));
    }

    // Obtener por ID
    static async findById(id) {
        const sql = 'SELECT * FROM projects WHERE id = $1';
        const result = await pool.query(sql, [id]);

        if (result.rows.length === 0) {
            return null;
        }

        const project = result.rows[0];
        project._id = project.id.toString(); // Compatibilidad con frontend
        project.videoUrl = project.video_url; // Mapear snake_case a camelCase
        project.technologies = project.technologies ? project.technologies.split(',') : [];
        return project;
    }

    // Actualizar proyecto
    static async findByIdAndUpdate(id, updateData, options = {}) {
        const {
            title,
            problem,
            solution,
            result,
            technologies,
            status,
            category,
            videoUrl,
            published
        } = updateData;

        const tech = Array.isArray(technologies) ? technologies.join(',') : technologies;

        const sql = `
            UPDATE projects
            SET title = $1,
                problem = $2,
                solution = $3,
                result = $4,
                technologies = $5,
                status = $6,
                category = $7,
                video_url = $8,
                published = $9
            WHERE id = $10
            RETURNING *
        `;

        const result_db = await pool.query(sql, [
            title,
            problem,
            solution,
            result,
            tech,
            status,
            category,
            videoUrl,
            published,
            id
        ]);

        if (result_db.rows.length === 0) {
            return null;
        }

        const project = result_db.rows[0];
        project._id = project.id.toString(); // Compatibilidad con frontend
        project.videoUrl = project.video_url; // Mapear snake_case a camelCase
        project.technologies = project.technologies ? project.technologies.split(',') : [];
        return project;
    }

    // Eliminar proyecto
    static async findByIdAndDelete(id) {
        const sql = 'DELETE FROM projects WHERE id = $1 RETURNING *';
        const result = await pool.query(sql, [id]);

        if (result.rows.length === 0) {
            return null;
        }

        const project = result.rows[0];
        project._id = project.id.toString(); // Compatibilidad con frontend
        project.videoUrl = project.video_url; // Mapear snake_case a camelCase
        project.technologies = project.technologies ? project.technologies.split(',') : [];
        return project;
    }

    static sort(sortObj) {
        // Método helper para compatibilidad con el código existente
        return this;
    }
}

module.exports = Project;
