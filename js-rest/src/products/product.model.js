import { Schema, model } from 'mongoose'

const productSchema = Schema({
  // _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
})

export const Product = model('Product', productSchema)
