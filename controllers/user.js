const User = require('../models/user')
const asyncWrapper = require('../middlewares/async')
const { createCustomError } = require('../errors/custom-error')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const register = asyncWrapper(async (req, res) => {
  const { email, password: plainTextPassword, name } = await req.body

  // var validation && errors

  const password = await bcrypt.hash(plainTextPassword, 10)
  try {
    const response = await User.create({
      email,
      password,
      name,
    })
    console.log('User created successfully: ', response)
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key
      return res.json({ status: 'error', error: 'Email already in use' })
    }
    throw error
  }

  res.json({ status: 'ok' })
})

const login = asyncWrapper(async (req, res) => {
  const { email, password } = await req.body
  const user = await User.findOne({ email })
  if (!user) {
    return res.json({ status: 'error', error: 'Invalid username/password' })
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.ACCESS_TOKEN_SECRET
    )
    return res.json({ status: 'ok', data: token })
  }
  res.json({ status: 'error', error: 'Invalid username/password' })
})

const changePassword = asyncWrapper(async (req, res) => {
  const { token } = await req.body
  const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
})

module.exports = { register, login, changePassword }
