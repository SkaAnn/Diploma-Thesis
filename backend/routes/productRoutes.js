import express from 'express'
import {
    getProducts, getProductById, createProduct,
    updateProduct, deleteProduct
} from '../controllers/productController.js'

const router = express.Router()

// @rootRoute   /api/products 
router.route('/')
    .get(getProducts)
    .post(createProduct)

router.route('/:id')
    .put(updateProduct)
    .delete(deleteProduct)
    .get(getProductById)
    
export default router