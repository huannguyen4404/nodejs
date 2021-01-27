import { Router } from 'express'
import Uploader from '../common/services/multer.service'
import { checkAuth } from '../users/jwt.middleware'
import { Product } from './product.model'

const productRouter = Router()

productRouter.get('/', (req, res) => {
  Product.find()
    .select('name price _id image')
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc) => ({
          ...doc?._doc,
          detail: `http://localhost:3000/api/products/${doc?._id}`,
        })),
      }
      res.status(200).json(response)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

productRouter.post('/', checkAuth, Uploader.single('image'), (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.file.path,
  })
  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Created product successfully',
        createdProduct: {
          ...result?._doc,
          detail: `http://localhost:3000/api/products/${result?._id}`,
        },
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

productRouter.get('/:productId', (req, res) => {
  const id = req.params.productId
  Product.findById(id)
    .select('name price _id image')
    .then((doc) => {
      console.log('From database', doc)
      if (doc) {
        res.status(200).json({
          product: doc,
          detail: `http://localhost:3000/api/products/${doc?._id}`,
        })
      } else {
        res.status(404).json({ message: 'No valid entry found for provided ID' })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})

productRouter.patch('/:productId', checkAuth, (req, res) => {
  const id = req.params.productId
  Product.findOneAndUpdate({ _id: id }, req.body)
    .then((result) => {
      res.status(200).json({
        message: 'Product updated',
        detail: `http://localhost:3000/api/products/${result?._id}`,
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

productRouter.delete('/:productId', checkAuth, (req, res) => {
  const id = req.params.productId
  Product.findOneAndDelete({ _id: id })
    .then(() => {
      res.status(204).json({
        message: 'Product deleted',
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

export default productRouter
