const fs = require('fs').promises;
const path = require('path');

const projectsFile = path.join(__dirname, '../data/projects.json');

// Inicializar archivo si no existe
async function ensureFileExists() {
    try {
        await fs.access(projectsFile);
    } catch {
        await fs.writeFile(projectsFile, JSON.stringify([], null, 2));
    }
}

class Project {
    static async find(query = {}) {
        await ensureFileExists();
        try {
            const data = await fs.readFile(projectsFile, 'utf8');
            let projects = data ? JSON.parse(data) : [];
            
            if (Object.keys(query).length === 0) return projects;
            
            return projects.filter(project => {
                return Object.keys(query).every(key => project[key] === query[key]);
            });
        } catch (error) {
            console.error('Error leyendo proyectos:', error);
            return [];
        }
    }

    static async findById(id) {
        await ensureFileExists();
        try {
            const data = await fs.readFile(projectsFile, 'utf8');
            const projects = data ? JSON.parse(data) : [];
            return projects.find(p => p._id === id) || null;
        } catch (error) {
            console.error('Error buscando proyecto:', error);
            return null;
        }
    }

    static async create(projectData) {
        await ensureFileExists();
        try {
            const data = await fs.readFile(projectsFile, 'utf8');
            const projects = data ? JSON.parse(data) : [];
            
            const newProject = {
                _id: Date.now().toString(),
                ...projectData,
                createdAt: new Date().toISOString(),
                published: projectData.published !== undefined ? projectData.published : true,
                status: projectData.status || 'En producción',
                category: projectData.category || 'Web',
                images: projectData.images || [],
                videoUrl: projectData.videoUrl || ''
            };
            
            projects.push(newProject);
            await fs.writeFile(projectsFile, JSON.stringify(projects, null, 2));
            
            return newProject;
        } catch (error) {
            console.error('Error creando proyecto:', error);
            throw error;
        }
    }

    static async findByIdAndUpdate(id, updateData, options = {}) {
        await ensureFileExists();
        try {
            const data = await fs.readFile(projectsFile, 'utf8');
            let projects = data ? JSON.parse(data) : [];
            
            const index = projects.findIndex(p => p._id === id);
            if (index === -1) return null;
            
            projects[index] = { ...projects[index], ...updateData };
            await fs.writeFile(projectsFile, JSON.stringify(projects, null, 2));
            
            return projects[index];
        } catch (error) {
            console.error('Error actualizando proyecto:', error);
            throw error;
        }
    }

    static async findByIdAndDelete(id) {
        await ensureFileExists();
        try {
            const data = await fs.readFile(projectsFile, 'utf8');
            let projects = data ? JSON.parse(data) : [];
            
            const project = projects.find(p => p._id === id);
            if (!project) return null;
            
            projects = projects.filter(p => p._id !== id);
            await fs.writeFile(projectsFile, JSON.stringify(projects, null, 2));
            
            return project;
        } catch (error) {
            console.error('Error eliminando proyecto:', error);
            throw error;
        }
    }

    static sort(sortObj) {
        // Método helper para compatibilidad con el código existente
        return this;
    }
}

module.exports = Project;
