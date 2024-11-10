const express = require('express')
const { postOpenAi } = require('./openaiController')
const router = express.Router()

router.post('/', postOpenAi)

module.exports = router