const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true,
    }],
    courseID: {
        type: String,
        required: true
    },
    professor: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true,
    },
    files: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    materials: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Material',
    }]
})

const courseModel = mongoose.model('Course', courseSchema)
module.exports = courseModel