const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
const { Schema } = mongoose

const UserSchema = new Schema(
  {
    email: {
      type: String,
      index: { unique: true },
      required: true,
    },
    password: { type: String, required: true },
    name: { type: String, required: true },
  },
  { collection: 'user' }
)

// bycrypt password later on ^_^

module.exports = mongoose.model('User', UserSchema)
