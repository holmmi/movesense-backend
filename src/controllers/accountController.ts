import { Request, Response } from 'express'
import { addAccount } from '../models/accountModel'

interface RegistrationDetails {
  name: string
  username: string
  password: string
  passwordConfirmation: string
  organizationId: number
}

const register = async (req: Request, res: Response) => {
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
    console.error(error)
    res.status(500).json({ msg: 'Internal server error' })
  }
}

export { register }
