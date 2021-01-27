import bcrypt from 'bcrypt'
import { Router } from 'express'
import { User } from './user.model'

const userRouter = Router()

userRouter.post('/signup', (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(409).json({ message: 'Mail exists.' })
      }
      bcrypt.hash(req.body.password, 10, (err, encrypted) => {
        if (err) {
          return res.status(500).json({ error: err })
        }
        const user = new User({
          email: req.body.email,
          password: encrypted,
        })
        user
          .save()
          .then((result) => {
            console.log(result)
            res.status(201).json({ message: 'User created.' })
          })
          .catch((err) => {
            console.log('Create user failed:', err)
            res.status(500).json({ error: err })
          })
      })
    })
    .catch((err) => {
      console.log('Signup failed:', err)
      return res.status(500).json({ error: err })
    })
})

userRouter.post('/login', (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'Email not existed.' })
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err || !result) {
          return res.status(401).json({ message: 'Auth failed.' })
        }
        const token = user.email // @TODO: implement jwt later
        return res.status(200).json({ token: token })
      })
    })
    .catch((err) => {
      console.log('Login failed:', err)
      return res.status(500).json({ error: err })
    })
})

userRouter.delete('/:userId', (req, res) => {
  console.log(req.params)
  User.remove({ _id: req.params.userId })
    .then(() => res.status(204).json({ message: 'User deleted' }))
    .catch((err) => {
      console.log('Remove user failed:', err)
      return res.status(500).json({ error: err })
    })
})

export default userRouter
