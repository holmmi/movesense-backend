import Express from 'express'
import helloRouter from './routers/helloRouter'

const app = Express()
app.use('/test', helloRouter)

export default app
