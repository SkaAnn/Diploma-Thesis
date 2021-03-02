import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    let mysort
    // console.log(req.query.sortKey)

    // Pagination
    const pageSize = 6
    const page = Number(req.query.pageNumber) || 1

    // Sorting products criterium
    switch (req.query.sortKey) {
        case 'time_desc': {
            mysort = { createdAt: 1 }
            break
        }
        case 'price_asc': {
            mysort = { price: 1 }
            break
        }
        case 'price_desc': {
            mysort = { price: -1 }
            break
        }
        default: {
            mysort = { createdAt: -1 }
            break
        }
    }

    // Count all products
    const count = await Product.countDocuments()

    const products = await Product
        .find({})
        .populate('user', 'id name')
        .sort(mysort)
        .limit(pageSize)
        .skip(pageSize * (page - 1))

    res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('user', 'id name')
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Create a product
// @route   POST /api/products
// @access  
const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, condition,
        classification, moreProperties } = req.body

    const data = {
        user: req.user._id,
        name, description, price,
        condition, classification, moreProperties
    }

    const product = new Product(data)

    const createdProduct = await product.save()

    res.status(201).json(createdProduct)
})

// TODO: pri kazdej zmene kodu modelu pozriet parametre ktore sa maju aktualizovat
// @desc    Update a product
// @route   PUT /api/products/:id
// @access  
const updateProduct = asyncHandler(async (req, res) => {
    // const { name, price, description, image,
    //     brand, category, countInStock } = req.body
    const body = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        // TODO - Update params
        product.name = body.name
        product.description = body.description
        product.price = body.price
        product.condition = body.condition
        product.classification = body.classification
        product.moreProperties = body.moreProperties

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({ message: 'Product removed' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// TODO
// inactivateProduct - oznacit produkt za neaktivny, vypredany

// @desc    Get products from one user 
// @route   GET /api/products/user/:id
// @access  Public
const getProductsByUser = asyncHandler(async (req, res) => {
    const products = await Product.find({ user: req.params.id })
    res.json(products)
})

export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByUser
}