import { NextFunction, Request, Response } from "express";
import CustomError, { errorHandler } from "../utils/Error";

export const checkUserRole = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;

    if (user && user.role === requiredRole) {
      return next();
    }

    errorHandler(
      res,
      new CustomError("Forbidden: Insufficient Permissions", 403)
    );
  };
};

export default checkUserRole;
