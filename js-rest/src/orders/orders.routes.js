import { Router } from 'express'
import { Product } from '../products/product.model'
import { Order } from './order.model'

const orderRouter = Router()

orderRouter.get('/', (req, res) => {
  Order.find()
    .select('_id product quantity')
    .populate('product', 'name')
    .then((result) => {
      res.status(200).json({
        count: result.length,
        orders: result.map((doc) => ({
          ...doc?._doc,
          detail: `http://localhost:3000/api/orders/${doc?._id}`,
        })),
      })
    })
    .catch((err) => res.status(500).json({ error: err }))
})

orderRouter.post('/', (req, res) => {
  Product.findById(req.body.productId)
    .then((product) => {
      if (!product)
        return res.status(404).json({
          message: 'Product not found.',
        })

      const order = new Order({
        quantity: req.body.quantity,
        product: req.body.productId,
      })
      return order.save()
    })
    .then((result) => {
      console.log(result)
      res.status(201).json({
        message: 'Order stored',
        createdOrder: result?._doc,
        detail: `http://localhost:3000/api/orders/${result?._id}`,
      })
    })
    .catch((err) => {
      console.log('Create Order failed: ', err)
      res.status(500).json({
        error: err,
      })
    })
})

orderRouter.get('/:orderId', (req, res) => {
  Order.findById(req.params.orderId)
    .populate('product')
    .then((order) => {
      if (!order) {
        return res.status(404).json({
          message: 'Order not found',
        })
      }
      res.status(200).json({
        order: order,
        detail: `http://localhost:3000/api/orders/${order?._id}`,
      })
    })
    .catch((err) => res.status(500).json({ error: err }))
})

orderRouter.delete('/:orderId', (req, res) => {
  Order.remove({ _id: req.params.orderId })
    .then(() =>
      res.status(204).json({
        message: 'Order deleted',
      }),
    )
    .catch((err) => res.status(500).json({ error: err }))
})

export default orderRouter
