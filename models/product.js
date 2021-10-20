const mongoose = require('mongoose')
const { Schema } = mongoose

var ProductSchema = new Schema(
  {
    category: { type: String },
    name: { type: String },
    description: { type: String },
    type: { type: String },
    fabric: { type: String },
    size: { type: Number },
    color: { type: String },
    created_at: { type: Date },
    updated_at: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
  },
  { versionKey: false },
  { strict: false }
)

module.exports = mongoose.model('Product', ProductSchema)
