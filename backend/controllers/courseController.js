const courseModel = require('../models/courseModel')
const jwt = require('jsonwebtoken')

const postCourse = async (req, res) => {
        try {
            const Courses = await courseModel.create(req.body)
            res.status(200).json(Courses)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
}
const getCourse = async (req, res) => {
    try {
        const Courses = await courseModel.findById(req.params.id)
        res.status(200).json(Courses)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const getAllCourses = async (req, res) => {
    try {
        const Courses = await courseModel.find().populate('professor')
        res.status(200).json(Courses)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteCourse = async (req, res) => {
    try {
        const Courses = await courseModel.findByIdAndDelete(req.params.id)
        res.status(200).json(Courses)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const putCourse = async (req, res) => {
    try {
        const Courses = await courseModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(Courses)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { postCourse, getCourse, getAllCourses, putCourse, deleteCourse }