import express from 'express'
import { register } from '../controllers/accountController'
import registrationValidator from '../validators/registrationValidator'

const router = express.Router()

router.post('/register', registrationValidator, register)

export default router
