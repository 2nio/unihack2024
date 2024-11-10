const materialModel = require('../models/materialModel')
const cloudinary = require('../config/cloudinaryConfig')

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
        const cloudinaryResult = req.body.image && await cloudinary.uploader.upload(req.body.image, {
            folder: "unihack2024",
            // width: 300,
            // crop: 'scale'
        })
        const Material = await materialModel.findById(req.params.id)
        const newMaterial = req.body.image ? await materialModel
            .findByIdAndUpdate(req.params.id,
                {
                    ...req.body, files: [...Material.files,
                    { name: req.body.name, public_id: cloudinaryResult.public_id, url: cloudinaryResult.url }]
                }) :
            await materialModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(newMaterial)
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
module.exports = { postMaterial, getAllMaterials, getMaterial, putMaterial, deleteMaterial }