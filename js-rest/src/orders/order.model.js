import { model, Schema } from 'mongoose'

const orderSchema = Schema({
  // _id: Schema.Types.ObjectId,
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1 },
})

export const Order = model('Order', orderSchema)
