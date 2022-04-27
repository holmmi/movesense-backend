import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";

const registrationValidator = [
  check("username", "usernameRequirements")
    .exists()
    .bail()
    .isLength({ min: 5 })
    .bail(),
  check("password", "passwordRequirements").exists().bail().isStrongPassword({
    minLength: 12,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  }),
  check("passwordConfirmation", "passwordEquality")
    .exists()
    .bail()
    .custom((value, { req }) => {
      return value === req.body.password;
    }),
  check("name", "nameRequirements").exists().bail().notEmpty().bail(),
  check("organizationId", "organizationRequirements").exists().isNumeric(),
  (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json(result.mapped());
    }
    next();
  }
];

export default registrationValidator;
