const mongoose = require('mongoose')

const materialSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    files: [{
        name: String,
        public_id: String,
        url: String,
        description: String
    }],
    course: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Course',
        required: true
    }
})
const materialModel = mongoose.model('Material', materialSchema)
module.exports = materialModel