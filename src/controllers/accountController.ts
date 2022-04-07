import { NextFunction, Request, Response } from 'express'
import {
  AccountDetails,
  addAccount,
  getAccountById,
} from '../models/accountModel'
import admin from 'firebase-admin'

interface RegistrationDetails {
  name: string
  username: string
  password: string
  passwordConfirmation: string
  organizationId: number
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  const account = req.user as AccountDetails
  try {
    const token = await admin
      .auth()
      .createCustomToken(account.id?.toString() ?? 'Unknown', {
        organizationId: account.organization_id,
        accountId: account.id,
      })
    res.json({ token: token })
  } catch (error) {
    next(error)
  }
}

const register = async (req: Request, res: Response, next: NextFunction) => {
  const registrationDetails = req.body as RegistrationDetails
  try {
    await addAccount({
      name: registrationDetails.name,
      username: registrationDetails.username,
      password: registrationDetails.password,
      organization_id: registrationDetails.organizationId,
    })
    res.json({ msg: 'Account has been created.' })
  } catch (error) {
    next(error)
  }
}

const accountDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const details = await getAccountById(req.accountId)
    res.json(details)
  } catch (error) {
    next(error)
  }
}

export { accountDetails, login, register }
