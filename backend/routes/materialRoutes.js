const express = require('express')
const { postMaterial } = require('../controllers/materialController')
const { getMaterial } = require('../controllers/materialController')
const { getAllMaterials } = require('../controllers/materialController')
const { deleteMaterial } = require('../controllers/materialController')
const { putMaterial } = require('../controllers/materialController')
const router = express.Router()
router
    .post('/', postMaterial)
    .get('/', getAllMaterials)
    
router
.get('/:id', getMaterial)
.delete('/:id', deleteMaterial )
.put('/:id', putMaterial )
    
module.exports = router 