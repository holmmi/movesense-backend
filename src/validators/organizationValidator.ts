import {NextFunction, Request, Response} from 'express'
import {check, validationResult} from 'express-validator'

const organizationValidator = [
    check('name')
        .exists()
        .bail()
        .isLength({min: 2})
        .bail(),
    (req: Request, res: Response, next: NextFunction) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json(result.mapped())
        }
        next()
    },
]

export default organizationValidator