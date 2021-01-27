import { Router } from 'express'
import { checkAuth } from '../users/jwt.middleware'
import OrdersController from './orders.controller'

const orderRouter = Router()

orderRouter.get('/', checkAuth, OrdersController.listOrders)

orderRouter.post('/', checkAuth, OrdersController.createOrder)

orderRouter.get('/:orderId', checkAuth, OrdersController.readOrder)

orderRouter.delete('/:orderId', checkAuth, OrdersController.deleteOrder)

export default orderRouter
