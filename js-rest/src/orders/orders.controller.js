import { Product } from '../products/product.model'
import OrderService from './orders.service'

export default {
  async listOrders(req, res) {
    try {
      const result = await OrderService.list()
      res.status(200).json({
        count: result.length,
        orders: result.map((doc) => ({
          ...doc?._doc,
          detail: `http://localhost:3000/api/orders/${doc?._id}`,
        })),
      })
    } catch (err) {
      return res.status(500).json({ error: err })
    }
  },

  async createOrder(req, res) {
    try {
      const product = await Product.findById(req.body.productId)
      if (!product) {
        return res.status(404).json({
          message: 'Product not found.',
        })
      }

      const result = await OrderService.create(product._id, req.body.quantity)
      res.status(201).json({
        message: 'Order stored',
        createdOrder: result?._doc,
        detail: `http://localhost:3000/api/orders/${result?._id}`,
      })
    } catch (err) {
      console.log('Create Order failed: ', err)
      return res.status(500).json({ error: err })
    }
  },

  async readOrder(req, res) {
    try {
      const order = await OrderService.detail(req.params.orderId)
      if (!order) {
        return res.status(404).json({ message: 'Order not found' })
      }
      res.status(200).json({
        order: order,
        detail: `http://localhost:3000/api/orders/${order?._id}`,
      })
    } catch (err) {
      return res.status(500).json({ error: err })
    }
  },

  async deleteOrder(req, res) {
    try {
      await OrderService.delete(req.params.orderId)
      return res.status(204).json({ message: 'Order deleted' })
    } catch (err) {
      return res.status(500).json({ error: err })
    }
  },
}
