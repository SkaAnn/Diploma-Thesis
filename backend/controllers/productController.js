import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    let mysort
    // console.log(req.query.sortKey)

    // Pagination
    const pageSize = 2 // TODO: 12 alebo 20
    const page = Number(req.query.pageNumber) || 1

    // Sorting products criterium
    switch (req.query.sortKey) {
        case 'time_asc': {
            mysort = { createdAt: -1 }
            break
        }
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

    // Search functionality
    const keyword = req.query.keyword ? { // query strings za ? v url
        name: {
            $regex: req.query.keyword,
            $options: 'i'     // case insensitive
        }
    } : {}


    // Count all products
    const count = await Product.countDocuments({ ...keyword, active: true })

    const products = await Product
        .find({ ...keyword, active: true })
        .populate('user', 'id name')
        .sort(mysort)
        .limit(pageSize)
        .skip(pageSize * (page - 1))

    res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// TODO nezobrazovat ked uz bude deaktivovany!
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
// @access  Private
const createProduct = asyncHandler(async (req, res) => {
    const { name, description, category,
        price, condition, classification, countInStock,
        origin, brand, images, measures,
        followers, shipping, moreProperties } = req.body

    const data = {
        user: req.user._id, active: true,
        name, description, category,
        price, condition, classification, countInStock,
        origin, brand, images, measures,
        followers, shipping, moreProperties
    }

    const product = new Product(data)

    const createdProduct = await product.save()

    res.status(201).json(createdProduct)
})

// TODO: pri kazdej zmene kodu modelu pozriet parametre ktore sa maju aktualizovat
// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
    // const { name, price, description, image,
    //     brand, category, countInStock } = req.body
    const body = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        // TODO - Update params
        // active is true
        product.name = body.name
        product.description = body.description
        product.category = body.category
        product.price = body.price
        product.condition = body.condition
        product.classification = body.classification
        product.countInStock = body.countInStock
        product.images = body.images
        product.origin = body.origin
        // brand, size, weight,
        // todo shipping
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
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        product.active = false
        await product.save()
        res.json({ message: 'Product removed' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// TODO
// deactivateProduct - oznacit produkt za neaktivny, vypredany

// @desc    Get my products 
// @route   GET /api/products/my
// @access  Private
const getMyProducts = asyncHandler(async (req, res) => {
    // Pagination
    const pageSize = 2 // TODO: 10
    const page = Number(req.query.pageNumber) || 1
    // Count all products
    const count = await Product.countDocuments({ user: req.user._id, active: true })

    const products = await Product.find({ user: req.user._id, active: true })
        .sort({ createdAt: -1 })
        .limit(pageSize)
        .skip(pageSize * (page - 1))

    res.json({ products, count, page, pages: Math.ceil(count / pageSize) })
    //  res.json(products)
})


// @desc    Get products from one user 
// @route   GET /api/products/user/:id
// @access  Public
const getProductsByUser = asyncHandler(async (req, res) => {
    const pageSize = 2 // TODO: 10
    const page = Number(req.query.pageNumber) || 1
    // Count all products
    const count = await Product.countDocuments({ user: req.params.id, active: true })

    const products = await Product.find({ user: req.params.id, active: true }).populate('user', 'id name')
        .limit(pageSize)
        .skip(pageSize * (page - 1))

    res.json({ products, count, page, pages: Math.ceil(count / pageSize) })
    // res.json(products)
})

// @desc    Add follower for product
// @route   POST /api/products/:id/follow
// @access  Private
const addProductFollower = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {

        const alreadyFollowed = product.followers.find(r => r.toString() === req.user._id.toString())
        if (alreadyFollowed) {
            res.status(400)
            throw new Error('Product is already followed by this user')
        }

        product.followers.push(req.user._id)
        await product.save()
        res.status(201).json({ message: 'Follower added!' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Remove product follower
// @route   PUT /api/products/:id/follow
// @access  Private
const removeProductFollower = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {

        const updatedFollowers = product.followers
        console.log('Pred: ', updatedFollowers)
        updatedFollowers.pull(req.user._id)
        console.log('Po: ', updatedFollowers)
        product.followers = updatedFollowers
        await product.save()

        res.status(201).json({ message: 'Follower removed!' })
        //res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Get users favorite products
// @route   GET /api/products/favorite
// @access  Private
const getMyFavoriteProducts = asyncHandler(async (req, res) => {
    const pageSize = 2 // TODO: 10
    const page = Number(req.query.pageNumber) || 1
    // Count all products
    const count = await Product.countDocuments({ followers: req.user._id, active: true })

    const products = await Product.find({ followers: req.user._id, active: true }).populate('user', 'id name').select('-followers')
        .limit(pageSize)
        .skip(pageSize * (page - 1))

    res.json({ products, count, page, pages: Math.ceil(count / pageSize) })
    //res.json(products)
})

export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getMyProducts,
    getProductsByUser,
    addProductFollower,
    removeProductFollower,
    getMyFavoriteProducts
}