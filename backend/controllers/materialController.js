const materialModel = require('../models/materialModel')
const jwt = require('jsonwebtoken')
const postMaterial = async (req, res) => {
    try {
        const Materials = await materialModel.create(req.body)
        res.status(200).json(Materials)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getAllMaterials = async (req, res) => {
    try {
        const Materials = await materialModel.find()
        res.status(200).json(Materials)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const getMaterial = async (req, res) => {
    try {
        const Materials = await materialModel.findById(req.params.id)
        res.status(200).json(Materials)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
    const putMaterial = async (req, res) => {
        try {
            const Materials = await materialModel.findByIdAndUpdate(req.params.id, req.body)
            res.status(200).json(Materials)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    const deleteMaterial = async (req, res) => {
        try {
            const Materials = await materialModel.findByIdAndDelete(req.params.id,)
            res.status(200).json(Materials)
        } catch (error) {
            res.status(400).json({ error: error.message })
                
        }
    }
module.exports = {postMaterial, getAllMaterials, getMaterial, putMaterial, deleteMaterial}