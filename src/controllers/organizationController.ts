import { NextFunction, Request, Response } from 'express'
import { getOrganizations } from '../models/organizationModel'

const getOrganizationDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await getOrganizations())
  } catch (error) {
    next(error)
  }
}

export { getOrganizationDetails }
