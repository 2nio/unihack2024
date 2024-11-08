const express = require('express')
const router = express.Router()
const verifyAccessToken = require('../middleware/verifyToken')
const { getAllUsers,
    signupUser,
    loginUser,
    signoutUser,
    getCurrentUser } = require('../controllers/userController')

router
    .post('/', signupUser)
    .get('/', getAllUsers)
router.get('/current', verifyAccessToken, getCurrentUser)
router.post('/login', loginUser)
router.post('/signout', signoutUser)

module.exports = router 