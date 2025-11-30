const fs = require('fs').promises;
const path = require('path');

async function initializeData() {
    const dataDir = path.join(__dirname, '../data');
    
    // Crear carpeta data si no existe
    try {
        await fs.mkdir(dataDir, { recursive: true });
        console.log('✅ Carpeta data creada/verificada');
    } catch (error) {
        console.log('Carpeta data ya existe');
    }
    
    // Inicializar projects.json
    const projectsFile = path.join(dataDir, 'projects.json');
    try {
        await fs.access(projectsFile);
        console.log('✅ projects.json existe');
    } catch {
        await fs.writeFile(projectsFile, JSON.stringify([], null, 2));
        console.log('✅ projects.json creado');
    }
    
    // Inicializar visits.json
    const visitsFile = path.join(dataDir, 'visits.json');
    try {
        await fs.access(visitsFile);
        console.log('✅ visits.json existe');
    } catch {
        const initialData = {
            totalVisits: 150,
            visitors: []
        };
        await fs.writeFile(visitsFile, JSON.stringify(initialData, null, 2));
        console.log('✅ visits.json creado con contador en 150');
    }
    
    console.log('🚀 Inicialización de datos completada\n');
}

initializeData().catch(console.error);
