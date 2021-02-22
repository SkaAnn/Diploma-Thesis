import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    await Product.find({}, (err, products) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!products.length) {
            return res
                .status(404)
                .json({ success: false, error: `Products not found` })
        }
        return res.status(200).json(products)
    }).catch(err => console.log(err))
}

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    await Product.findOne({ _id: req.params.id }, (err, product) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!product) {
            return res
                .status(404)
                .json({ success: false, error: `Product not found` })
        }
        return res.status(200).json({ success: true, data: product })
    }).catch(err => console.log(err))
}

// @desc    Create a product
// @route   POST /api/products
// @access  
const createProduct = (req, res) => {
    const body = req.body

    console.log(body)

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a product',
        })
    }

    const product = new Product(body)

    if (!product) {
        return res.status(400).json({ success: false, error: err })
    }

    product
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: product._id,
                message: 'Product created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Product not created!',
            })
        })
}

// TODO: pri kazdej zmene kodu modelu pozriet parametre ktore sa maju aktualizovat
// @desc    Update a product
// @route   PUT /api/products/:id
// @access  
const updateProduct = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Product.findOne({ _id: req.params.id }, (err, product) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Product not found!',
            })
        }

        // TODO - Update params
        product.title = body.title
        product.description = body.description
        product.price = body.price
        product.moreProperties = body.moreProperties  // todo: ak nebudu udane tak ponechaj tie co su v databaze
        
        product
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: product._id,
                    message: 'Product updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Product not updated!',
                })
            })
    })
}

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  
const deleteProduct = async (req, res) => {
    await Product.findOneAndDelete({ _id: req.params.id }, (err, product) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!product) {
            return res
                .status(404)
                .json({ success: false, error: `Product not found` })
        }

        return res.status(200).json({ success: true, data: product })
    }).catch(err => console.log(err))
}

// TODO
// inactivateProduct - oznacit produkt za neaktivny, vypredany
// getProductsByUser - ziskaj produkty jedneho usera

export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}