const express = require('express')
// const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
// const bodyParser = require('body-parser')
// const cookieSession = require('cookie-session')
const product = require('./routes/product')
const notFound = require('./middlewares/not-found')
const errorHandlerMiddleware = require('./middlewares/error-handler')
const connectDB = require('./db/connect')

const app = express()
app.use(express.json())

app.use('/api/v1/product', product)
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
