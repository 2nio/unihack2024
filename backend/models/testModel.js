const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    material: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Material',
        required: true
    },
    name: {
        type: String
    },
    test: [{
        Q: String,
        A: String
    }]
})

const testModel = mongoose.model('Test', testSchema)
module.exports = testModel