import { Router } from 'express'
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
    this.router.get('/:id', this.productsController.getProduct)
  }
}
