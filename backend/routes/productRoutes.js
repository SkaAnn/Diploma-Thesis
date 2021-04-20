import express from 'express'
import {
    getProducts, getProductById, createProduct,
    updateProduct, deleteProduct, getProductsByUser,
    getMyProducts, addFollower, getFavoriteProducts,
    removeFollower
} from '../controllers/productController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// @rootRoute   /api/products 
router.route('/')
    .get(getProducts)
    .post(protect, createProduct)

router.route('/my').get(protect, getMyProducts)

router.route('/favorite').get(protect, getFavoriteProducts)

router.route('/user/:id').get(getProductsByUser)

router.route('/:id')
    .put(protect, updateProduct)
    .delete(protect, deleteProduct)
    .get(getProductById)

router.route('/:id/follow')
    .post(protect, addFollower)
    .put(protect, removeFollower)

export default router