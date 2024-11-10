const express = require('express')
const router = express.Router()
const { postTest, getTest, getAllTests, deleteTest, putTest } = require('../controllers/testController')

router
    .post('/', postTest)
    .get('/', getAllTests)

router
    .get('/:id', getTest)
    .delete('/:id', deleteTest)
    .put('/:id', putTest)
module.exports = router 