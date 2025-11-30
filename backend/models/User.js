const pool = require('../db/connection');

class User {
    static async find(query = {}) {
        let sql = 'SELECT * FROM users';
        const params = [];

        if (query.username) {
            sql += ' WHERE username = $1';
            params.push(query.username);
        }

        const result = await pool.query(sql, params);
        return result.rows;
    }

    static async findOne(query) {
        const users = await this.find(query);
        return users[0] || null;
    }

    static async countDocuments() {
        const result = await pool.query('SELECT COUNT(*) as count FROM users');
        return parseInt(result.rows[0].count);
    }

    static async create(userData) {
        const { username, password, role = 'admin' } = userData;

        const sql = `
            INSERT INTO users (username, password, role)
            VALUES ($1, $2, $3)
            RETURNING *
        `;

        const result = await pool.query(sql, [username, password, role]);
        return result.rows[0];
    }

    static async deleteMany(query) {
        if (Object.keys(query).length === 0) {
            await pool.query('DELETE FROM users');
        } else if (query.username) {
            await pool.query('DELETE FROM users WHERE username = $1', [query.username]);
        }
    }

    static async save(userData) {
        return await this.create(userData);
    }
}

module.exports = User;
