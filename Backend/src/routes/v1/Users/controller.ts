import { NextFunction, Request, Response } from "express";
import { successResponse } from "../../../utils/HttpResponse";

const UserController = {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      return successResponse({
        response: res,
        message: "User Controller",
        data: "Hello World",
      });
    } catch (error) {
      next(error);
    }
  },
};

export default UserController;
