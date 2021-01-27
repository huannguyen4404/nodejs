import ProductService from './product.service'

export const listProducts = async (req, res) => {
  try {
    const docs = await ProductService.list()
    const response = {
      count: docs.length,
      products: docs.map((doc) => ({
        ...doc?._doc,
        detail: `http://localhost:3000/api/products/${doc?._id}`,
      })),
    }
    res.status(200).json(response)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
}

export const createProduct = async (req, res) => {
  try {
    const productData = {
      name: req.body.name,
      price: req.body.price,
      image: req.file.path,
    }
    const result = await ProductService.create(productData)
    res.status(201).json({
      message: 'Created product successfully',
      createdProduct: {
        ...result?._doc,
        detail: `http://localhost:3000/api/products/${result?._id}`,
      },
    })
  } catch (err) {
    console.log('Create product failed:', err)
    res.status(500).json({ error: err })
  }
}

export const readProduct = async (req, res) => {
  try {
    const doc = await ProductService.detail(req.params.productId)
    if (doc) {
      res.status(200).json({
        product: doc,
        detail: `http://localhost:3000/api/products/${doc?._id}`,
      })
    } else {
      res.status(404).json({ message: 'No valid entry found for provided ID' })
    }
  } catch (err) {
    console.log('Read product failed: ', err)
    res.status(500).json({ error: err })
  }
}

export const editProduct = async (req, res) => {
  try {
    const result = await ProductService.update(req.params.productId, req.body)
    res.status(200).json({
      message: 'Product updated',
      detail: `http://localhost:3000/api/products/${result?._id}`,
    })
  } catch (err) {
    console.log('Update product failed: ', err)
    res.status(500).json({ error: err })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    await ProductService.delete(req.params.productId)
    res.status(204).json({ message: 'Product deleted' })
  } catch (err) {
    console.log('DeleteProduct failed:', err)
    res.status(500).json({ error: err })
  }
}
