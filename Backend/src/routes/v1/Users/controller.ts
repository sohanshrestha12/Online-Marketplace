import { NextFunction, Request, Response } from "express";
import { successResponse } from "../../../utils/HttpResponse";
import { User } from "./model";
import UserService from "./services";

const UserController = {
  async createUser(
    req: Request<unknown, unknown, User>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = req.body;

      const result = await UserService.createUser(body);

      return successResponse({
        response: res,
        message: "Account created successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userBody = res.locals.user;
      const user = await UserService.getUserById(userBody._id);
      return successResponse({
        response: res,
        message: "Retrieved Logged In user successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default UserController;
