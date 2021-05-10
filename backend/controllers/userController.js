import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc    Login user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) { // Match user password
        // generate user token
        const token = generateToken(user._id)
        user.token = token
        await user.save()

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token,
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc    Auth user
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) { // Match user password
        res.json({ message: 'success' })
    } else {
        res.status(401)
        throw new Error('Not authorized')
    }
})


// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password,
        phoneNumber, profileImage, profileType,
        locality, profileInfo, marketPolicy,
        favoriteProducts, display } = req.body

    const nameExist = await User.findOne({ name })

    if (nameExist) {
        res.status(400)
        throw new Error('User with same name already exists')
    }

    const emailExist = await User.findOne({ email })

    if (emailExist) {
        res.status(400)
        throw new Error('User with same email already exists')
    }

    const user = await User.create({
        name, email, password,
        phoneNumber, profileImage, profileType,
        locality, profileInfo, marketPolicy,
        favoriteProducts, display
    })

    if (user) {
        // generate user token
        const token = generateToken(user._id)
        user.token = token
        await user.save()

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Public
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            locality: user.locality,
            profileImage: user.profileImage,
            profileType: user.profileType,
            profileInfo: user.profileInfo,
            marketPolicy: user.marketPolicy,
            display: user.display,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Get logged user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Update logged user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber
        user.profileImage = req.body.profileImage || user.profileImage
        user.profileInfo = req.body.profileInfo || user.profileInfo
        user.marketPolicy = req.body.marketPolicy || user.marketPolicy
        user.display = req.body.display || user.display

        if (req.body.password) {
            user.password = req.body.password
        }

        // generate user token
        const token = generateToken(user._id)
        user.token = token

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            token: token,
        })

    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export { loginUser, authUser, registerUser, getUserById, getUserProfile, updateUserProfile }