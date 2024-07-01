import { Router } from "express";
import UserController from "./controller";
import requireUser from "../../../Middleware/requireUser";

const UserRouter = Router();

UserRouter.route("/").post(UserController.createUser);  
UserRouter.route("/getCurrentUser").get(
  requireUser,
  UserController.getCurrentUser
);


export default UserRouter;
