const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { Schema } = mongoose

const UserSchema = new Schema({
  email: {
    type: String,
    index: { unique: true },
  },
  password: String,
  name: String,
})

// bycrypt password later on ^_^

module.exports = mongoose.model('User', UserSchema)
