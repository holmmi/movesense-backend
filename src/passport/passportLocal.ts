import passport from 'passport'
import * as passportLocal from 'passport-local'
import { getAccount } from '../models/accountModel'
import bcrypt from 'bcrypt'

const LocalStrategy = passportLocal.Strategy

passport.use(
  new LocalStrategy(async (username: string, password: string, done) => {
    const account = await getAccount(username)
    if (!account) {
      return done(null, false)
    }
    if (!(await bcrypt.compare(password, account.password))) {
      return done(null, false)
    }
    return done(null, account)
  })
)

export default passport
