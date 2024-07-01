import { Router } from "express";
import AuthController from "./controller";
import requireUser from "../../../Middleware/requireUser";

const AuthRouter = Router();

AuthRouter.route('/login').post(AuthController.login);
AuthRouter.route("/logout").post(requireUser, AuthController.logout);


export default AuthRouter;