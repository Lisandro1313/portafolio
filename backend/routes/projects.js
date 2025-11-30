const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // 5MB
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif|mp4|webm/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Solo archivos de imagen o video');
        }
    }
});

// @route   GET api/projects
// @desc    Obtener todos los proyectos publicados
// @access  Public
router.get('/', async (req, res) => {
    try {
        let projects = await Project.find({ published: true });
        // Ordenar manualmente por fecha
        projects = projects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
});

// @route   GET api/projects/all
// @desc    Obtener todos los proyectos (incluyendo no publicados)
// @access  Private
router.get('/all', auth, async (req, res) => {
    try {
        let projects = await Project.find();
        projects = projects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
});

// @route   GET api/projects/:id
// @desc    Obtener proyecto por ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        res.json(project);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        res.status(500).send('Error del servidor');
    }
});

// @route   POST api/projects
// @desc    Crear nuevo proyecto
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const { title, problem, solution, result, technologies, status, category, videoUrl, published } = req.body;

        const newProject = new Project({
            title,
            problem,
            solution,
            result,
            technologies,
            status,
            category,
            videoUrl,
            published
        });

        const project = await newProject.save();
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error del servidor', message: err.message });
    }
});

// @route   PUT api/projects/:id
// @desc    Actualizar proyecto
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        const { title, problem, solution, result, technologies, status, category, videoUrl, published } = req.body;

        // Construir objeto de proyecto
        const projectFields = {};
        if (title) projectFields.title = title;
        if (problem) projectFields.problem = problem;
        if (solution) projectFields.solution = solution;
        if (result) projectFields.result = result;
        if (technologies) projectFields.technologies = technologies;
        if (status) projectFields.status = status;
        if (category) projectFields.category = category;
        if (videoUrl) projectFields.videoUrl = videoUrl;
        if (published !== undefined) projectFields.published = published;

        let project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        project = await Project.findByIdAndUpdate(
            req.params.id,
            { $set: projectFields },
            { new: true }
        );

        res.json(project);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        res.status(500).send('Error del servidor');
    }
});

// @route   DELETE api/projects/:id
// @desc    Eliminar proyecto
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        await Project.findByIdAndDelete(req.params.id);

        res.json({ message: 'Proyecto eliminado' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        res.status(500).json({ error: 'Error del servidor', message: err.message });
    }
});

// @route   POST api/projects/upload
// @desc    Subir imagen
// @access  Private
router.post('/upload', auth, upload.single('file'), (req, res) => {
    try {
        res.json({
            fileName: req.file.filename,
            filePath: `/uploads/${req.file.filename}`
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error del servidor', message: err.message });
    }
});

module.exports = router;
