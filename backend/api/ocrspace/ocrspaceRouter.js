const express = require('express')
const { postOCR } = require('./ocrspaceController')
const router = express.Router()

router.post('/', postOCR)

module.exports = router