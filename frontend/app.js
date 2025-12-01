// Configuración de API - Detecta automáticamente el entorno
const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api'
    : '/api';

// Variables del carrusel
let allProjects = [];
let currentProjectIndex = 0;
let autoPlayInterval = null;

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
                        id="carouselVideo"
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

    // Configurar listener para el iframe de YouTube
    setupVideoListener();

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
// Navegar a un proyecto específico
function goToProject(index) {
    currentProjectIndex = index;
    renderCarousel();
    renderProjectsList();
    resetAutoPlay(); // Reiniciar auto-play al hacer click en la lista
}

// Configurar controles del carrusel
function setupCarouselControls() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.onclick = () => {
        currentProjectIndex = (currentProjectIndex - 1 + allProjects.length) % allProjects.length;
        renderCarousel();
        renderProjectsList();
        resetAutoPlay(); // Reiniciar auto-play al interactuar
    };

    nextBtn.onclick = () => {
        currentProjectIndex = (currentProjectIndex + 1) % allProjects.length;
        renderCarousel();
        renderProjectsList();
        resetAutoPlay(); // Reiniciar auto-play al interactuar
    };

    // Soporte para teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    });

    // Auto-play cada 5 segundos
    startAutoPlay();
}

// Iniciar auto-play del carrusel
function startAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);

    autoPlayInterval = setInterval(() => {
        currentProjectIndex = (currentProjectIndex + 1) % allProjects.length;
        renderCarousel();
        renderProjectsList();
    }, 5000); // Cambia cada 5 segundos
}

// Reiniciar auto-play
function resetAutoPlay() {
    startAutoPlay();
}

// Pausar auto-play cuando el usuario interactúa
function pauseAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

// Configurar listener para detectar reproducción del video
function setupVideoListener() {
    // Escuchar mensajes de YouTube API
    window.addEventListener('message', function(event) {
        if (event.origin !== 'https://www.youtube.com') return;
        
        try {
            const data = JSON.parse(event.data);
            
            // Estado 1 = reproduciendo, Estado 2 = pausado
            if (data.event === 'infoDelivery' && data.info && data.info.playerState !== undefined) {
                if (data.info.playerState === 1) {
                    // Video reproduciéndose - pausar carrusel
                    pauseAutoPlay();
                } else if (data.info.playerState === 2) {
                    // Video en pausa - reanudar carrusel
                    resetAutoPlay();
                }
            }
        } catch (e) {
            // Ignorar errores de parsing
        }
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

    // Pausar carrusel mientras el modal está abierto
    pauseAutoPlay();

    // Cerrar al hacer clic fuera del modal
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.remove();
            resetAutoPlay();
        }
    };

    // Reanudar carrusel cuando se cierra el modal
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.onclick = () => {
        modal.remove();
        resetAutoPlay();
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
        return `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
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

// ===== ANIMACIÓN DE ESTRELLAS EN CANVAS =====
const canvas = document.getElementById('starsCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Ajustar canvas al redimensionar ventana
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
});

// Clase para las estrellas
class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random();
        this.fadeSpeed = (Math.random() - 0.5) * 0.01;
        this.color = this.getRandomColor();
    }

    getRandomColor() {
        const colors = [
            'rgba(255, 0, 110, ',  // neon-pink
            'rgba(6, 255, 165, ',  // neon-cyan
            'rgba(131, 56, 236, ', // neon-purple
            'rgba(255, 255, 255, ' // white
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity += this.fadeSpeed;

        // Rebote en los bordes
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        // Fade in/out
        if (this.opacity <= 0 || this.opacity >= 1) this.fadeSpeed *= -1;
    }

    draw() {
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Clase para estrellas fugaces
class ShootingStar {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -100;
        this.length = Math.random() * 80 + 10;
        this.speed = Math.random() * 10 + 6;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.angle = Math.PI / 4; // 45 grados
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // Resetear cuando sale de la pantalla
        if (this.y > canvas.height + 100) {
            this.reset();
        }
    }

    draw() {
        const gradient = ctx.createLinearGradient(
            this.x, this.y,
            this.x - Math.cos(this.angle) * this.length,
            this.y - Math.sin(this.angle) * this.length
        );
        gradient.addColorStop(0, `rgba(6, 255, 165, ${this.opacity})`);
        gradient.addColorStop(1, 'rgba(6, 255, 165, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
            this.x - Math.cos(this.angle) * this.length,
            this.y - Math.sin(this.angle) * this.length
        );
        ctx.stroke();
    }
}

// Clase para agujero negro
class BlackHole {
    constructor() {
        this.active = false;
        this.x = 0;
        this.y = 0;
        this.radius = 0;
        this.maxRadius = 150;
        this.growing = true;
        this.absorbedStars = [];
    }

    activate() {
        this.active = true;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = 0;
        this.growing = true;
        this.absorbedStars = [];
    }

    update() {
        if (!this.active) return;

        // Crecer y luego encogerse
        if (this.growing) {
            this.radius += 3;
            if (this.radius >= this.maxRadius) {
                this.growing = false;
            }
        } else {
            this.radius -= 2;
            if (this.radius <= 0) {
                this.active = false;
                // Devolver estrellas absorbidas
                this.absorbedStars.forEach(star => {
                    star.x = this.x + (Math.random() - 0.5) * 200;
                    star.y = this.y + (Math.random() - 0.5) * 200;
                });
            }
        }

        // Absorber estrellas cercanas
        stars.forEach(star => {
            const dx = star.x - this.x;
            const dy = star.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.radius && this.growing) {
                // Atraer estrellas hacia el centro
                star.x += -dx * 0.1;
                star.y += -dy * 0.1;

                if (distance < 20) {
                    this.absorbedStars.push(star);
                }
            }
        });
    }

    draw() {
        if (!this.active) return;

        // Dibujar agujero negro
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.radius
        );
        gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
        gradient.addColorStop(0.5, 'rgba(131, 56, 236, 0.6)');
        gradient.addColorStop(1, 'rgba(131, 56, 236, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Anillo de acreción
        ctx.strokeStyle = `rgba(255, 0, 110, ${0.8 * (this.radius / this.maxRadius)})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.7, 0, Math.PI * 2);
        ctx.stroke();
    }
}

// Clase para explosión cósmica
class CosmicExplosion {
    constructor() {
        this.active = false;
        this.x = 0;
        this.y = 0;
        this.particles = [];
        this.frame = 0;
        this.maxFrame = 60;
    }

    activate() {
        this.active = true;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.frame = 0;
        this.particles = [];

        // Crear partículas de explosión
        for (let i = 0; i < 50; i++) {
            const angle = (Math.PI * 2 * i) / 50;
            this.particles.push({
                x: this.x,
                y: this.y,
                vx: Math.cos(angle) * (Math.random() * 5 + 2),
                vy: Math.sin(angle) * (Math.random() * 5 + 2),
                color: ['rgba(255, 0, 110, ', 'rgba(6, 255, 165, ', 'rgba(131, 56, 236, '][Math.floor(Math.random() * 3)],
                size: Math.random() * 3 + 1
            });
        }
    }

    update() {
        if (!this.active) return;

        this.frame++;
        if (this.frame >= this.maxFrame) {
            this.active = false;
            return;
        }

        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.98; // Fricción
            p.vy *= 0.98;
        });
    }

    draw() {
        if (!this.active) return;

        const opacity = 1 - (this.frame / this.maxFrame);

        this.particles.forEach(p => {
            ctx.fillStyle = p.color + opacity + ')';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        // Flash central
        if (this.frame < 10) {
            const flashOpacity = 1 - (this.frame / 10);
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, 100
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${flashOpacity})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 100, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

let stars = [];
let shootingStars = [];
let blackHole = new BlackHole();
let cosmicExplosion = new CosmicExplosion();

// Activar agujero negro cada 20 segundos
setInterval(() => {
    if (!blackHole.active) {
        blackHole.activate();
    }
}, 20000);

// Activar explosión cósmica cada 25 segundos
setInterval(() => {
    if (!cosmicExplosion.active) {
        cosmicExplosion.activate();
    }
}, 25000);

function initStars() {
    stars = [];
    shootingStars = [];

    // Crear estrellas estáticas
    for (let i = 0; i < 100; i++) {
        stars.push(new Star());
    }

    // Crear estrellas fugaces
    for (let i = 0; i < 3; i++) {
        shootingStars.push(new ShootingStar());
    }
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Animar y dibujar estrellas estáticas
    stars.forEach(star => {
        star.update();
        star.draw();
    });

    // Animar y dibujar estrellas fugaces
    shootingStars.forEach(star => {
        star.update();
        star.draw();
    });

    // Actualizar y dibujar agujero negro
    blackHole.update();
    blackHole.draw();

    // Actualizar y dibujar explosión cósmica
    cosmicExplosion.update();
    cosmicExplosion.draw();

    requestAnimationFrame(animateStars);
}

// Iniciar animación de estrellas
initStars();
animateStars();
