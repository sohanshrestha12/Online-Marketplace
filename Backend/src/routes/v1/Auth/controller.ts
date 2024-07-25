import { CookieOptions, NextFunction, Request, Response } from "express";
import { successResponse } from "../../../utils/HttpResponse";
import AuthService from "./service";
import { Auth, ForgetPassword, ResetTokenPayload } from "./types";
import CustomError from "../../../utils/Error";
import jwt from "jsonwebtoken";
import { getUserByEmail, getUserById, saveResetPassword } from "../Users/repository";
import nodemailer from "nodemailer";
import env from "../../../config/env";
import bcrypt from "bcrypt";



const AuthController = {
  async login(
    req: Request<unknown, unknown, Auth>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = req.body;
      const { accessToken, refreshToken } = await AuthService.login(body);
      
      const options: CookieOptions = {
        httpOnly: false,
        path: "/",
        sameSite: "lax",
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
  async logout(
    req: Request<unknown, unknown, unknown>,
    res: Response,
    next: NextFunction
  ) {
    try {
      res.locals.user = null;
      res.cookie("accessToken", "", { expires: new Date(0) });
      res.cookie("refreshToken", "", { expires: new Date(0) });

      return successResponse({
        status: 200,
        response: res,
        message: "logout successful",
      });
    } catch (error) {
      next(error);
    }
  },

  async forgetPassword(
    req: Request<unknown, unknown, ForgetPassword>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email } = req.body;
      if (!email) throw new CustomError("Email is required", 400);
      const user = await getUserByEmail(email);
      if (!user) throw new CustomError("User not found", 404);
      const token = jwt.sign({ userId: user._id }, env.forgetPasswordSecret, {
        expiresIn: "10m",
      });
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: env.authEmail,
          pass: env.authPassword,
        },
      });

      const mailOptions = {
        from: env.authEmail,
        to: email,
        subject: "Reset Password",
        html: `<h1>Reset Your Password</h1>
          <p>Click on the following link to reset your password:</p>
          <a href="http://localhost:5173/reset_password/${token}">http://localhost:5173/reset_password/${token}</a>
          <p>The link will expire in 10 minutes.</p>
          <p>If you didn't request a password reset, please ignore this email.</p>
        `,
      };

      transporter.sendMail(mailOptions);
      return successResponse({
        status: 200,
        response: res,
        message: "ForgetPassword success.",
      });
    } catch (error) {
      next(error);
    }
  },

   async resetPassword(
    req: Request<{ token: string }, unknown, Auth>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { token } = req.params;
      const {password} = req.body;
      const decodedToken = jwt.verify(
        token,
        env.forgetPasswordSecret
      ) as ResetTokenPayload;
      if (!decodedToken) throw new CustomError("Invalid Token", 401);

      const userId = decodedToken.userId;
      const user = await getUserById(userId);
      if (!user) throw new CustomError("no user found", 404);


      const newHashPassword = await bcrypt.hash(password, 10);


      user.password = newHashPassword;
      await saveResetPassword(user);

      return successResponse({
        status: 200,
        response: res,
        message: "Password reset successful.",
      });
    } catch (error) {
      next(error);
    }
  },
};

export default AuthController;
