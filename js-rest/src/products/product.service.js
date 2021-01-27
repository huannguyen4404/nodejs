import { Product } from './product.model'

export default {
  async list() {
    return await Product.find().select('name price _id image')
  },

  async create(data) {
    const product = new Product(data)
    return await product.save()
  },

  async detail(productId) {
    return await Product.findById(productId).select('name price _id image')
  },

  async update(productId, productData) {
    return await Product.findOneAndUpdate({ _id: productId }, productData)
  },

  async delete(productId) {
    return await Product.findOneAndDelete({ _id: productId })
  },
}
