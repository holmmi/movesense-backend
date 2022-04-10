import express from 'express'
import { getOrganizationDetails } from '../controllers/organizationController'

const router = express.Router()

router.get('/details', getOrganizationDetails)

export default router
