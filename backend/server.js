import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'

import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

// Connect to database
connectDB() 

const app = express()
const apiPort = 5000

app.use(bodyParser.urlencoded({ extended: true }))  // Allows to use whole body, not only parts
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/products',productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes)

// Make upload static folder
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// Handling errors
app.use(notFound)           // e.g. not existing id
app.use(errorHandler)     // error, or not existing routing

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))