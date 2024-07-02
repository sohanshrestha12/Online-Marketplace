import { Router } from "express";
import UserController from "./controller";
import requireUser from "../../../Middleware/requireUser";
import upload from "../../../Middleware/multerConfig";

const UserRouter = Router();

UserRouter.route("/").post(UserController.createUser);  
UserRouter.route("/getCurrentUser").get(
  requireUser,
  UserController.getCurrentUser
);
UserRouter.post(
  "/profileImage",
  upload.single("profileImage"),
  requireUser,
  UserController.updateImage
);




export default UserRouter;
