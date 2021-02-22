import express from 'express'

import connectDB from './config/db.js'

// Connect to database
connectDB() 

const app = express()
const apiPort = 5000

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))