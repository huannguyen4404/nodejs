import { Router } from 'express'
import Uploader from '../common/services/multer.service'
import { checkAuth } from '../users/jwt.middleware'
import * as ProductController from './products.controller'

const productRouter = Router()

productRouter.get('/', ProductController.listProducts)

productRouter.post('/', checkAuth, Uploader.single('image'), ProductController.createProduct)

productRouter.get('/:productId', ProductController.readProduct)

productRouter.patch('/:productId', checkAuth, ProductController.editProduct)

productRouter.delete('/:productId', checkAuth, ProductController.deleteProduct)

export default productRouter
