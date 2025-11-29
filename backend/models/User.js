const fs = require('fs').promises;
const path = require('path');

const usersFile = path.join(__dirname, '../data/users.json');

class User {
    static async find(query = {}) {
        const data = await fs.readFile(usersFile, 'utf8');
        let users = JSON.parse(data);
        
        if (Object.keys(query).length === 0) return users;
        
        return users.filter(user => {
            return Object.keys(query).every(key => user[key] === query[key]);
        });
    }

    static async findOne(query) {
        const users = await this.find(query);
        return users[0] || null;
    }

    static async countDocuments() {
        const users = await this.find();
        return users.length;
    }

    static async create(userData) {
        const data = await fs.readFile(usersFile, 'utf8');
        const users = JSON.parse(data);
        
        const newUser = {
            _id: Date.now().toString(),
            id: Date.now().toString(),
            ...userData,
            createdAt: new Date()
        };
        
        users.push(newUser);
        await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
        
        return newUser;
    }

    static async deleteMany(query) {
        const data = await fs.readFile(usersFile, 'utf8');
        let users = JSON.parse(data);
        
        if (Object.keys(query).length === 0) {
            users = [];
        } else {
            users = users.filter(user => {
                return !Object.keys(query).every(key => user[key] === query[key]);
            });
        }
        
        await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
    }

    static async save(userData) {
        return await this.create(userData);
    }
}

module.exports = User;
