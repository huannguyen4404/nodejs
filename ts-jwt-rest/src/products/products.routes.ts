import { Router } from 'express'
import { checkJWT } from '../users/middleware/auth.middleware'
import { ProductsController } from './products.controller'

export class ProductsRouter {
  public router: Router
  public productsController: ProductsController = new ProductsController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  routes(): void {
    this.router.get('/', this.productsController.getProducts)
    this.router.get('/:id', [checkJWT], this.productsController.getProduct)
    this.router.post('/', [checkJWT], this.productsController.createProduct)
    this.router.put('/:id', [checkJWT], this.productsController.updateProduct)
    this.router.delete(
      '/:id',
      [checkJWT],
      this.productsController.deleteProduct,
    )
  }
}
