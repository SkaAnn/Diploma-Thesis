import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

// Connect to database
connectDB()

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))  // Allows to use whole body, not only parts
app.use(bodyParser.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes)

// Make upload static folder
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// FOR PRODUCTION
if (process.env.NODE_ENV === 'production') {
    // make frontend/build as static folder
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    // any route thats not api
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => {
        res.send('API is running...')
    })
}

// Handling errors
app.use(notFound)           // e.g. not existing id
app.use(errorHandler)     // error, or not existing routing

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))