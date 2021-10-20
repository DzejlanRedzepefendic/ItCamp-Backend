const Product = require('../models/product')
const asyncWrapper = require('../middlewares/async')
const { createCustomError } = require('../errors/custom-error')
const getAllProducts = asyncWrapper(async (req, res) => {
  const products = await Product.find({})
  res.status(200).json({ products })
})
const createProduct = asyncWrapper(async (req, res) => {
  const product = await Product.create(req.body)
  console.log(req.body)
  res.status(201).json({ product })
})
const getProduct = asyncWrapper(async (req, res, next) => {
  const { id: productID } = req.params
  const product = await Product.findOne({ _id: productID })
  if (!product) {
    return next(createCustomError(`No task with id : ${productID}`, 404))
  }

  res.status(200).json({ product })
})
const updateProduct = asyncWrapper(async (req, res, next) => {
  const { id: productID } = req.params

  const task = await Product.findOneAndUpdate({ _id: productID }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!product) {
    return next(createCustomError(`No task with id : ${productID}`, 404))
  }

  res.status(200).json({ product })
})

const deleteProduct = asyncWrapper(async (req, res, next) => {
  const { id: productID } = req.params
  const product = await Product.findOneAndDelete({ _id: productID })
  if (!product) {
    return next(createCustomError(`No task with id : ${productID}`, 404))
  }
  res.status(200).json({ product })
})

module.exports = {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
}
