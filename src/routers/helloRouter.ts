import Express from 'express'

const router = Express.Router()

router.get('/hello', (_, res) => {
  res.json({ message: 'Hello World!' })
})

export default router
