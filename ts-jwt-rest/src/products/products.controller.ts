import { Request, Response } from 'express'
import productService from './product.service'

export class ProductsController {
  async getProducts(_req: Request, res: Response): Promise<void> {
    const products = await productService.list()
    res.json({ products })
  }

  async getProduct(req: Request, res: Response): Promise<void> {
    const productId = req.body.productId
    try {
      const product = await productService.readById(productId)
      res.status(200).send(product)
    } catch (error) {
      res.status(404).send(error.message)
    }
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const productId = await productService.create(req.body)
      res.status(201).send({ productId: productId })
    } catch (error) {
      res.status(500).send(error.message)
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      req.body.productId = req.params.id
      await productService.updateById(req.body)
      res.sendStatus(200)
    } catch (error) {
      res.status(404).send(error.message)
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      await productService.deleteById(req.params.id)
      res.sendStatus(204)
    } catch (error) {
      res.status(404).send(error.message)
    }
  }
}
