const materialModel = require('../models/materialModel')
const testModel = require('../models/testModel')
const axios = require('axios')

const postTest = async (req, res) => {
    try {
        const { name, material } = req.body
        const Material = await materialModel.findById(material)
        console.log(Material.files[0].url)

        const ocrspace = await axios.post(`http://localhost:8080/ocrspace`, { url: Material.files[0].url })
        console.log(ocrspace.data)
        const openai = await axios.post(`http://localhost:8080/openai`, { lesson: ocrspace.data })
        console.log(openai.data)

        const Test = await testModel.create({ name, material, test: openai.data })
        res.status(200).json(Test)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const getTest = async (req, res) => {
    try {
        console.log(req.params)
        const Tests = await testModel.findById(req.params.id)
        res.status(200).json(Tests)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const getAllTests = async (req, res) => {
    try {
        const Tests = await testModel.find()
        res.status(200).json(Tests)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteTest = async (req, res) => {
    try {
        const Tests = await testModel.findByIdAndDelete(req.params.id)
        res.status(200).json(Tests)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const putTest = async (req, res) => {
    try {
        const Tests = await testModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(Tests)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { postTest, getTest, getAllTests, putTest, deleteTest }