import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'

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

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))