const express = require('express')
const router = express.Router()
const { postCourse, getCourse, getAllCourses, deleteCourse, putCourse } = require('../controllers/courseController')

router
    .post('/', postCourse)
    .get('/', getAllCourses)

router
    .get('/:id', getCourse)
    .delete('/:id', deleteCourse)
    .put('/:id', putCourse) 
module.exports = router 