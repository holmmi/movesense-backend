import express from 'express'
import { login, register } from '../controllers/accountController'
import passport from '../passport/passportLocal'
import loginValidator from '../validators/loginValidator'
import registrationValidator from '../validators/registrationValidator'

const router = express.Router()
router.post('/register', registrationValidator, register)
router.post(
  '/login',
  loginValidator,
  passport.authenticate('local', { session: false }),
  login
)

export default router
