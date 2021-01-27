import { Order } from './order.model'

export default {
  list: async () => {
    return await Order.find().select('_id product quantity').populate('product', 'name')
  },

  create: async (productId, quantity) => {
    const order = new Order({
      quantity: quantity,
      product: productId,
    })
    return await order.save()
  },

  detail: async (orderId) => {
    return await Order.findById(orderId).populate('product')
  },

  delete: async (orderId) => {
    return Order.remove({ _id: orderId })
  },
}
