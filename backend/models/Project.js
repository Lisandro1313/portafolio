const fs = require('fs').promises;
const path = require('path');

const projectsFile = path.join(__dirname, '../data/projects.json');

class Project {
    static async find(query = {}) {
        const data = await fs.readFile(projectsFile, 'utf8');
        let projects = JSON.parse(data);
        
        if (Object.keys(query).length === 0) return projects;
        
        return projects.filter(project => {
            return Object.keys(query).every(key => project[key] === query[key]);
        });
    }

    static async findById(id) {
        const data = await fs.readFile(projectsFile, 'utf8');
        const projects = JSON.parse(data);
        return projects.find(p => p._id === id) || null;
    }

    static async create(projectData) {
        const data = await fs.readFile(projectsFile, 'utf8');
        const projects = JSON.parse(data);
        
        const newProject = {
            _id: Date.now().toString(),
            ...projectData,
            createdAt: new Date(),
            published: projectData.published !== undefined ? projectData.published : true,
            status: projectData.status || 'En producción',
            category: projectData.category || 'Web',
            images: projectData.images || [],
            videoUrl: projectData.videoUrl || ''
        };
        
        projects.push(newProject);
        await fs.writeFile(projectsFile, JSON.stringify(projects, null, 2));
        
        return newProject;
    }

    static async findByIdAndUpdate(id, updateData, options = {}) {
        const data = await fs.readFile(projectsFile, 'utf8');
        let projects = JSON.parse(data);
        
        const index = projects.findIndex(p => p._id === id);
        if (index === -1) return null;
        
        projects[index] = { ...projects[index], ...updateData };
        await fs.writeFile(projectsFile, JSON.stringify(projects, null, 2));
        
        return projects[index];
    }

    static async findByIdAndDelete(id) {
        const data = await fs.readFile(projectsFile, 'utf8');
        let projects = JSON.parse(data);
        
        const project = projects.find(p => p._id === id);
        if (!project) return null;
        
        projects = projects.filter(p => p._id !== id);
        await fs.writeFile(projectsFile, JSON.stringify(projects, null, 2));
        
        return project;
    }

    static sort(sortObj) {
        // Método helper para compatibilidad con el código existente
        return this;
    }
}

module.exports = Project;
