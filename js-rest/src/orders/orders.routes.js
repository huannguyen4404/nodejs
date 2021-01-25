import { Router } from 'express'

const orderRouter = Router()

orderRouter.get('/', (req, res) => {
  res.status(200).json({
    message: 'Orders were fetched',
  })
})

orderRouter.post('/', (req, res) => {
  res.status(201).json({
    message: 'Order was created',
  })
})

orderRouter.get('/:orderId', (req, res) => {
  res.status(200).json({
    message: 'Order details',
    orderId: req.params.orderId,
  })
})

orderRouter.delete('/:orderId', (req, res) => {
  res.status(200).json({
    message: 'Order deleted',
    orderId: req.params.orderId,
  })
})

export default orderRouter
