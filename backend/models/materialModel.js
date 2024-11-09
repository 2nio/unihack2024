const mongoose = require('mongoose')

const materialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    }
})
const materialModel = mongoose.model('material', materialSchema)
module.exports = materialModel