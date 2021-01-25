import { ICRUD } from '../common/interface/crud.interface'
import { IProduct, Product } from './product.model'

class ProductsService implements ICRUD {
  private static instance: ProductsService

  static getInstance(): ProductsService {
    if (!ProductsService.instance) {
      ProductsService.instance = new ProductsService()
    }
    return ProductsService.instance
  }

  async list() {
    return await Product.find()
  }

  async readById(productId: string) {
    const record = await Product.findOne({ productId: productId })
    if (record) {
      return record
    }

    throw new Error('No product found')
  }

  async create(data: Record<string, unknown>): Promise<string> {
    const product = new Product(data)
    const result = await product.save()
    if (result) {
      return result.productId
    }

    throw new Error('Create product failed.')
  }

  async updateById(resource: IProduct) {
    const product = await Product.findOneAndUpdate(
      { productId: resource.productId },
      resource,
    )
    if (product) {
      return
    }

    throw new Error('No product found to update.')
  }

  async deleteById(resourceId: string) {
    const product = await Product.findOneAndDelete({ productId: resourceId })
    if (product) {
      return
    }

    throw new Error('No product found to remove.')
  }
}

export default ProductsService.getInstance()
