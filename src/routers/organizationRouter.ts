import express from "express";
import { getOrganizationDetails, addNewOrganization } from "../controllers/organizationController";
import organizationValidator from "../validators/organizationValidator";

const router = express.Router();

router.get("/details", getOrganizationDetails);

router.post("/add", organizationValidator, addNewOrganization);

export default router;
