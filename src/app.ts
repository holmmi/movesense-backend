import express from 'express'
import accountRoute from './routes/accountRoute'

const app = express()

app.use(express.json())
app.use('/account', accountRoute)

export default app
