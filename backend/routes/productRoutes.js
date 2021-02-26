import express from 'express'
import {
    getProducts, getProductById, createProduct,
    updateProduct, deleteProduct
} from '../controllers/productController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// @rootRoute   /api/products 
router.route('/')
    .get(getProducts)
    .post(protect, createProduct)

router.route('/:id')
    .put(updateProduct)
    .delete(deleteProduct)
    .get(getProductById)

export default router