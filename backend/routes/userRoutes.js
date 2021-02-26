import express from 'express'
import { authUser, registerUser } from '../controllers/userController.js'

const router = express.Router()

// @rootRoute   /api/users

router.route('/')
    .post(registerUser)

router.route('/login')
    .post(authUser)

// router.route('/:id')
//     .get(getUserById)



export default router