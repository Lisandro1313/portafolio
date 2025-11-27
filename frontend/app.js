// Configuración de API
const API_URL = 'http://localhost:5000/api';

// Cargar proyectos desde el backend
async function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');

    try {
        const response = await fetch(`${API_URL}/projects`);
        const projects = await response.json();

        if (projects.length === 0) {
            projectsGrid.innerHTML = '<p class="no-projects">No hay proyectos publicados aún.</p>';
            return;
        }

        projectsGrid.innerHTML = projects.map(project => `
            <div class="project-card">
                <h3>${project.title}</h3>
                
                <div class="project-info">
                    <h4>Problema:</h4>
                    <p>${project.problem}</p>
                    
                    <h4>Solución:</h4>
                    <p>${project.solution}</p>
                    
                    <h4>Resultado:</h4>
                    <p>${project.result}</p>
                    
                    ${project.technologies ? `
                        <h4>Tecnologías:</h4>
                        <div class="project-tags">
                            ${project.technologies.split(',').map(tech =>
            `<span class="tag">${tech.trim()}</span>`
        ).join('')}
                        </div>
                    ` : ''}
                </div>
                
                <span class="project-status">${project.status}</span>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error cargando proyectos:', error);
        projectsGrid.innerHTML = `
            <div class="error-message">
                <p>⚠️ No se pudieron cargar los proyectos.</p>
                <p>Asegurate de que el backend esté ejecutándose.</p>
            </div>
        `;
    }
}

// Smooth scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación de aparición en scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar secciones
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease';
    observer.observe(section);
});

// Cargar proyectos al iniciar
document.addEventListener('DOMContentLoaded', loadProjects);
