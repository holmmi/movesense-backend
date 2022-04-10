import { NextFunction, Request, Response } from 'express'
import admin from 'firebase-admin'

const idTokenVerifier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers['authorization']) {
    const token = req.headers['authorization'].substring(7)
    try {
      const idToken = await admin.auth().verifyIdToken(token)
      req.accountId = parseInt(idToken.uid, 10)
      next()
    } catch (error) {
      console.error(error)
      res.sendStatus(401)
    }
  }
}

export default idTokenVerifier
