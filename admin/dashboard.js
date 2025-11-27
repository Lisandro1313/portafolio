const API_URL = 'http://localhost:5001/api';

// Verificar autenticación
const token = localStorage.getItem('token');
if (!token) {
    window.location.href = 'login.html';
}

// Variables globales
let editingProjectId = null;
const modal = document.getElementById('projectModal');
const projectForm = document.getElementById('projectForm');
const projectsList = document.getElementById('projects-list');

// Event Listeners
document.getElementById('logoutBtn').addEventListener('click', logout);
document.getElementById('newProjectBtn').addEventListener('click', openNewProjectModal);
document.querySelector('.close').addEventListener('click', closeModal);
document.getElementById('cancelBtn').addEventListener('click', closeModal);
projectForm.addEventListener('submit', handleSubmitProject);

// Cerrar modal al hacer click fuera
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Cargar proyectos al iniciar
loadProjects();

// Funciones
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

async function loadProjects() {
    try {
        const response = await fetch(`${API_URL}/projects/all`, {
            headers: {
                'x-auth-token': token
            }
        });

        const projects = await response.json();

        if (projects.length === 0) {
            projectsList.innerHTML = '<p class="loading">No tenés proyectos aún. Creá uno nuevo para empezar.</p>';
            return;
        }

        projectsList.innerHTML = projects.map(project => `
            <div class="project-admin-card">
                <div class="project-info-admin">
                    <h3>${project.title}</h3>
                    <p>${project.problem.substring(0, 100)}...</p>
                    <div class="project-meta">
                        <span class="badge badge-status">${project.status}</span>
                        <span class="badge badge-category">${project.category}</span>
                        ${!project.published ? '<span class="badge badge-unpublished">No publicado</span>' : ''}
                    </div>
                </div>
                <div class="project-actions">
                    <button class="btn-edit" onclick="editProject('${project._id}')">Editar</button>
                    <button class="btn-delete" onclick="deleteProject('${project._id}')">Eliminar</button>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error:', error);
        projectsList.innerHTML = '<p class="loading">Error al cargar proyectos</p>';
    }
}

function openNewProjectModal() {
    editingProjectId = null;
    document.getElementById('modalTitle').textContent = 'Nuevo Proyecto';
    projectForm.reset();
    document.getElementById('published').checked = true;
    modal.classList.add('show');
}

async function editProject(id) {
    try {
        const response = await fetch(`${API_URL}/projects/${id}`);
        const project = await response.json();

        editingProjectId = id;
        document.getElementById('modalTitle').textContent = 'Editar Proyecto';
        document.getElementById('projectId').value = id;
        document.getElementById('title').value = project.title;
        document.getElementById('problem').value = project.problem;
        document.getElementById('solution').value = project.solution;
        document.getElementById('result').value = project.result;
        document.getElementById('technologies').value = project.technologies;
        document.getElementById('status').value = project.status;
        document.getElementById('category').value = project.category;
        document.getElementById('videoUrl').value = project.videoUrl || '';
        document.getElementById('published').checked = project.published;

        modal.classList.add('show');
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar el proyecto');
    }
}

async function deleteProject(id) {
    if (!confirm('¿Estás seguro de eliminar este proyecto?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'x-auth-token': token
            }
        });

        if (response.ok) {
            loadProjects();
        } else {
            alert('Error al eliminar el proyecto');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar el proyecto');
    }
}

async function handleSubmitProject(e) {
    e.preventDefault();

    const projectData = {
        title: document.getElementById('title').value,
        problem: document.getElementById('problem').value,
        solution: document.getElementById('solution').value,
        result: document.getElementById('result').value,
        technologies: document.getElementById('technologies').value,
        status: document.getElementById('status').value,
        category: document.getElementById('category').value,
        videoUrl: document.getElementById('videoUrl').value,
        published: document.getElementById('published').checked
    };

    try {
        const url = editingProjectId
            ? `${API_URL}/projects/${editingProjectId}`
            : `${API_URL}/projects`;

        const method = editingProjectId ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify(projectData)
        });

        if (response.ok) {
            closeModal();
            loadProjects();
        } else {
            const data = await response.json();
            alert(data.message || 'Error al guardar el proyecto');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al guardar el proyecto');
    }
}

function closeModal() {
    modal.classList.remove('show');
    projectForm.reset();
    editingProjectId = null;
}
