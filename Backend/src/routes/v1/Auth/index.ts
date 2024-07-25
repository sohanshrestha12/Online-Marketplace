import { Router } from "express";
import AuthController from "./controller";
import requireUser from "../../../Middleware/requireUser";

const AuthRouter = Router();

AuthRouter.route('/login').post(AuthController.login);
AuthRouter.route("/logout").post(requireUser, AuthController.logout);

//For Forgot Password

AuthRouter.route("/forgetPassword").post(AuthController.forgetPassword);
AuthRouter.route("/reset-password/:token").post(AuthController.resetPassword);


export default AuthRouter;