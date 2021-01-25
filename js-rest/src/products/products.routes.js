import { Router } from 'express'

const productRouter = Router()

productRouter.get('/', (req, res) => {
  res.status(200).json({
    message: 'Handling GET requests to /products',
  })
})

productRouter.post('/', (req, res) => {
  res.status(201).json({
    message: 'Handling POST requests to /products',
  })
})

productRouter.get('/:productId', (req, res) => {
  const id = req.params.productId
  if (id === 'special') {
    res.status(200).json({
      message: 'You discovered the special ID',
      id: id,
    })
  } else {
    res.status(200).json({
      message: 'You passed an ID',
    })
  }
})

productRouter.patch('/:productId', (req, res) => {
  res.status(200).json({
    message: 'Updated product!',
  })
})

productRouter.delete('/:productId', (req, res) => {
  res.status(200).json({
    message: 'Deleted product!',
  })
})

export default productRouter
