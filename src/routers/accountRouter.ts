import express from "express";
import {
  accountDetails,
  login,
  register
} from "../controllers/accountController";
import idTokenVerifier from "../controllers/idTokenVerifier";
import passport from "../passport/passportLocal";
import loginValidator from "../validators/loginValidator";
import registrationValidator from "../validators/registrationValidator";

const router = express.Router();
router.post("/register", registrationValidator, register);
router.post(
  "/login",
  loginValidator,
  passport.authenticate("local", { session: false }),
  login
);
router.get("/details", idTokenVerifier, accountDetails);

export default router;
