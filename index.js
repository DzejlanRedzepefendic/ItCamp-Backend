const express = require('express')
const dotenv = require('dotenv').config()
const product = require('./routes/product')
const register = require('./routes/register')
const login = require('./routes/login')
const notFound = require('./middlewares/not-found')
const errorHandlerMiddleware = require('./middlewares/error-handler')
const connectDB = require('./db/connect')
const jwt = require('jsonwebtoken')
const app = express()
app.use(express.json())

app.use('/api/v1/product', product)
app.use('/api/register', register)
app.use('/api/login', login)
app.use('/ping', (req, res) => {
  res.send('PONG!')
})

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.mongoURI)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
