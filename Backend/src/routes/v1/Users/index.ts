import { Router } from "express";
import UserController from "./controller";

const UserRouter = Router();

UserRouter.route("/").post(UserController.createUser);  

export default UserRouter;
