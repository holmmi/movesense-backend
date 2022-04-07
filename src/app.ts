import express, { Request, Response } from 'express'
import accountRoute from './routes/accountRoute'

const app = express()

app.use(express.json())
app.use('/account', accountRoute)
app.use((err: Error, _req: Request, res: Response) => {
  console.error(err.stack)
  res.status(500).json({ msg: 'Internal server error' })
})

export default app
