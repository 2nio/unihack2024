const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '5m' })
}
const createRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '16d' })
}

const refreshOptions = {
    httpOnly: true,
    maxAge: 60000 * 60 * 24 * 16,
    sameSite: "none",
    secure: true,
};

const accessOptions = {
    maxAge: 60000 * 5,
    sameSite: "none",
    secure: true,
};


const signupUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const User = await userModel.signup(email, password, name)
        const accessToken = createAccessToken(User._id)
        res.cookie('accessToken', accessToken, accessOptions)

        const refreshToken = createRefreshToken(User._id)
        res.cookie('refreshToken', refreshToken, refreshOptions)

        res.status(200).json('Account created')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const User = await userModel.login(email, password)

        const accessToken = createAccessToken(User._id)
        res.cookie('accessToken', accessToken, accessOptions)

        const refreshToken = createRefreshToken(User._id)
        res.cookie('refreshToken', refreshToken, refreshOptions)

        res.status(200).json('Account logged')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const signoutUser = async (req, res) => {
    res.cookie('refreshToken', '', { maxAge: 1, httpOnly: true, sameSite: 'none', secure: true })
    res.cookie('accessToken', '', { maxAge: 1, sameSite: 'none', secure: true })
    res.status(200).json('Signed out')
}

const getCurrentUser = async (req, res) => {
    const authHeader = req.headers['authorization']
    const accessToken = req.cookies.accessToken || authHeader.split(' ')[1]
    try {
        const Token = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        const User = await userModel.findById(Token.id)
        res.status(200).json(User)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const Users = await userModel.find()
        res.status(200).json(Users)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { signupUser, loginUser, signoutUser, createAccessToken, getCurrentUser, getAllUsers }