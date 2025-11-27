const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    problem: {
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: true
    },
    result: {
        type: String,
        required: true
    },
    technologies: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['En producción', 'En pruebas', 'Demo funcional', 'Operativo'],
        default: 'En producción'
    },
    images: [{
        type: String
    }],
    videoUrl: {
        type: String
    },
    category: {
        type: String,
        enum: ['Web', 'App', 'IA', 'Automatización', 'Sistema', 'Otro'],
        default: 'Web'
    },
    published: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Project', ProjectSchema);
