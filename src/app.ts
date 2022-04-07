import express, { Request, Response } from 'express'
import accountRouter from './routers/accountRouter'

const app = express()

app.use(express.json())
app.use('/account', accountRouter)
app.use((err: Error, _req: Request, res: Response) => {
  console.error(err.stack)
  res.status(500).json({ msg: 'Internal server error' })
})

export default app
