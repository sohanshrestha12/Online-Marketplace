import { Router } from "express";
import UserController from "./controller";
import requireUser from "../../../Middleware/requireUser";
import upload from "../../../Middleware/multerConfig";

const UserRouter = Router();

UserRouter.route("/").post(UserController.createUser);  
UserRouter.route("/sellerRegistration").post(UserController.sellerRegistration);  
UserRouter.route("/verifyOtp/:id/:code").post(UserController.verifyOtp);

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
UserRouter.route('/profileUpdate').post(UserController.profileUpdate);




export default UserRouter;
