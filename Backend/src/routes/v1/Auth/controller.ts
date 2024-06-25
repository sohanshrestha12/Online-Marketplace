import { CookieOptions, NextFunction, Request, Response } from "express";
import { successResponse } from "../../../utils/HttpResponse";
import AuthService from "./service";
import { Auth } from "./types";

const AuthController = {
  async login(
    req: Request<unknown, unknown, Auth>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = req.body;
      const { accessToken, refreshToken } = await AuthService.login(body);
      // const expiresInDays = 7; // Set expiration time to 7 days
      const expirationTimeInMinutes = 2;
      const expiryDate = new Date();
      // expiryDate.setDate(expiryDate.getDate() + expiresInDays);
      expiryDate.setTime(
        expiryDate.getTime() + expirationTimeInMinutes * 60 * 1000
      );
      const options: CookieOptions = {
        httpOnly: false,
        path: "/",
        sameSite: "lax",
        // expires:expiryDate
      };
      res
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options);
      return successResponse({
        status: 200,
        response: res,
        message: "Login Successful",
      });
    } catch (error) {
      next(error);
    }
  },
};

export default AuthController;
