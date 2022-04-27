import { NextFunction, Request, Response } from "express";
import { getOrganizations, addOrganization } from "../models/organizationModel";

const getOrganizationDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await getOrganizations());
  } catch (error) {
    next(error);
  }
};

const addNewOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await addOrganization({ name: req.body.name });
    res.json({ msg: "Organization added" });
  } catch (error) {
    next(error);
  }
};

export { getOrganizationDetails, addNewOrganization };
