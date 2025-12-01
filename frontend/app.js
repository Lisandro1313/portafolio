// Configuración de API - Detecta automáticamente el entorno
const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api'
    : '/api';

// Variables del carrusel
let allProjects = [];
let currentProjectIndex = 0;

// Cargar proyectos desde el backend
async function loadProjects() {
    const carouselMain = document.getElementById('carouselMain');
    const projectsList = document.getElementById('projectsList');

    try {
        const response = await fetch(`${API_URL}/projects`);

        if (!response.ok) {
            throw new Error('Error al cargar proyectos');
        }

        const projects = await response.json();
        allProjects = projects;

        if (projects.length === 0) {
            carouselMain.innerHTML = `
                <div class="no-projects-message">
                    <h3>🚀 Portfolio en construcción</h3>
                    <p>Pronto habrá proyectos increíbles aquí</p>
                </div>
            `;
            projectsList.innerHTML = '<p class="empty-list">Sin proyectos aún</p>';
            return;
        }

        // Renderizar carrusel y lista
        renderCarousel();
        renderProjectsList();
        setupCarouselControls();

    } catch (error) {
        console.log('Error cargando proyectos:', error);
        carouselMain.innerHTML = `
            <div class="no-projects-message">
                <h3>🚀 Portfolio en construcción</h3>
                <p>Los proyectos se cargarán en breve</p>
            </div>
        `;
        projectsList.innerHTML = '<p class="empty-list">Cargando...</p>';
    }
}

// Renderizar carrusel principal
function renderCarousel() {
    const carouselMain = document.getElementById('carouselMain');
    const project = allProjects[currentProjectIndex];

    if (!project) return;

    carouselMain.innerHTML = `
        <div class="carousel-card">
            ${project.videoUrl ? `
                <div class="project-video">
                    <iframe 
                        width="100%" 
                        height="400" 
                        src="${getEmbedUrl(project.videoUrl)}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
            ` : ''}
            
            <div class="carousel-content">
                <h3>${project.title}</h3>
                <p class="project-description">${project.problem}</p>
                
                ${project.technologies && project.technologies.length > 0 ? `
                    <div class="project-tags">
                        ${(Array.isArray(project.technologies)
                            ? project.technologies
                            : project.technologies.split(',')
                        ).map(tech =>
                            `<span class="tag">${tech.trim()}</span>`
                        ).join('')}
                    </div>
                ` : ''}
                
                <button class="btn btn-details" onclick="showProjectDetails(${currentProjectIndex})">
                    Ver detalles completos →
                </button>
            </div>
        </div>
    `;

    // Actualizar dots
    renderDots();
}

// Renderizar dots del carrusel
function renderDots() {
    const dotsContainer = document.getElementById('carouselDots');
    dotsContainer.innerHTML = allProjects.map((_, index) => `
        <span class="dot ${index === currentProjectIndex ? 'active' : ''}" 
              onclick="goToProject(${index})"></span>
    `).join('');
}

// Renderizar lista de proyectos
function renderProjectsList() {
    const projectsList = document.getElementById('projectsList');
    
    projectsList.innerHTML = allProjects.map((project, index) => `
        <div class="list-item ${index === currentProjectIndex ? 'active' : ''}" 
             onclick="goToProject(${index})">
            <span class="list-icon">🔹</span>
            <div class="list-content">
                <h4>${project.title}</h4>
                <p>${project.problem.substring(0, 60)}...</p>
            </div>
        </div>
    `).join('');
}

// Navegar a un proyecto específico
function goToProject(index) {
    currentProjectIndex = index;
    renderCarousel();
    renderProjectsList();
}

// Configurar controles del carrusel
function setupCarouselControls() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.onclick = () => {
        currentProjectIndex = (currentProjectIndex - 1 + allProjects.length) % allProjects.length;
        renderCarousel();
        renderProjectsList();
    };

    nextBtn.onclick = () => {
        currentProjectIndex = (currentProjectIndex + 1) % allProjects.length;
        renderCarousel();
        renderProjectsList();
    };

    // Soporte para teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    });
}

// Mostrar detalles completos del proyecto (modal)
function showProjectDetails(index) {
    const project = allProjects[index];
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="this.parentElement.parentElement.remove()">✕</button>
            
            <h2>${project.title}</h2>
            
            ${project.videoUrl ? `
                <div class="project-video">
                    <iframe 
                        width="100%" 
                        height="400" 
                        src="${getEmbedUrl(project.videoUrl)}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
            ` : ''}
            
            <div class="modal-body">
                <div class="detail-section">
                    <h3>🎯 Problema</h3>
                    <p>${project.problem}</p>
                </div>
                
                <div class="detail-section">
                    <h3>💡 Solución</h3>
                    <p>${project.solution}</p>
                </div>
                
                <div class="detail-section">
                    <h3>✅ Resultado</h3>
                    <p>${project.result}</p>
                </div>
                
                ${project.technologies && project.technologies.length > 0 ? `
                    <div class="detail-section">
                        <h3>🛠️ Tecnologías</h3>
                        <div class="project-tags">
                            ${(Array.isArray(project.technologies)
                                ? project.technologies
                                : project.technologies.split(',')
                            ).map(tech =>
                                `<span class="tag">${tech.trim()}</span>`
                            ).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <div class="project-status-badge">${project.status}</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Cerrar al hacer clic fuera del modal
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

// Convertir URLs de YouTube/Vimeo a embed
function getEmbedUrl(url) {
    if (!url) return '';

    // YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const videoId = url.includes('youtu.be')
            ? url.split('youtu.be/')[1]?.split('?')[0]
            : url.split('v=')[1]?.split('&')[0];
        return `https://www.youtube.com/embed/${videoId}`;
    }

    // Vimeo
    if (url.includes('vimeo.com')) {
        const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
        return `https://player.vimeo.com/video/${videoId}`;
    }

    // Loom
    if (url.includes('loom.com')) {
        const videoId = url.split('share/')[1]?.split('?')[0];
        return `https://www.loom.com/embed/${videoId}`;
    }

    return url; // Si es otro tipo, usar la URL directa
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
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    registerVisit();
    loadVisitCount();
});

// Registrar visita
async function registerVisit() {
    try {
        await fetch(`${API_URL}/analytics/visits/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        // Silencioso - no mostrar error al usuario
    }
}

// Cargar contador de visitas
async function loadVisitCount() {
    try {
        const response = await fetch(`${API_URL}/analytics/visits/count`);
        if (!response.ok) throw new Error('Error');

        const data = await response.json();

        const visitElement = document.getElementById('visitCount');
        if (visitElement && data.totalVisits) {
            visitElement.textContent = data.totalVisits.toLocaleString('es-AR');
        }
    } catch (error) {
        // Silencioso - mantener el valor por defecto
    }
}
