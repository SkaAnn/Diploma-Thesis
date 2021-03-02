import express from 'express'
import { authUser, getUserById, registerUser, updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// @rootRoute   /api/users

router.route('/')
    .post(registerUser)

router.route('/login')
    .post(authUser)

router.route('/profile')
    .put(protect, updateUserProfile)

router.route('/:id')
    .get(getUserById)

export default router