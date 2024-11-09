const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    students: {
        type: String,
        required: true,
        unique: true
    },
    courseID: {
        type: String,
        required: true
    },
    professor: {
        type: String,
        required: true
    },
    files: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    }
})

const courseModel = mongoose.model('Course', courseSchema)
module.exports = courseModel