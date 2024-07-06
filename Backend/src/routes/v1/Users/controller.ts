import { NextFunction, Request, Response } from "express";
import CustomError from "../../../utils/Error";
import { successResponse } from "../../../utils/HttpResponse";
import { User } from "./model";
import UserService from "./services";
import { SellerUser } from "./types";
import { findUserOtp } from "../Otp/repository";

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
  async verifyOtp(req: Request<{id:string,code:string}>, res: Response, next: NextFunction) {
    try {
      const { id, code } = req.params;
      const user = await UserService.getUserById(id);
      if (id != user._id.toString())
        throw new CustomError("No code with particular id is available", 404);
      const usersOtp = await findUserOtp(user._id.toString());
      if (code != usersOtp?.code)
        throw new CustomError("Invalid otp. Please try again.", 400);
      if (usersOtp.expiration.getTime() < Date.now()) {
        await UserService.deleteUserOtp(usersOtp._id.toString());
        throw new CustomError("Otp already expired!", 400);
      }
      const updatedUser = await UserService.updateUserVerification(id);
      return successResponse({
        response: res,
        message: "User Verification Successful",
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  },
  async updateImage(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user._id;
      const files = req.file as Express.Multer.File;
      if (!files) {
        throw new CustomError("No files uploaded", 400);
      }

      const filesPath = files.path.replace("uploads\\", "");
      const response = await UserService.updateImage(userId, filesPath);
      if (!response)
        throw new CustomError("Something went wrong pls try again later", 500);
      return successResponse({
        response: res,
        message: "Profile Image updated successfully",
        data: response,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  },
  async sellerRegistration(
    req: Request<unknown, unknown, SellerUser>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = req.body;
      const response = await UserService.sellerRegistration(body);
      return successResponse({
        response: res,
        message: "Seller Registered Successfully",
        data: response,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default UserController;
