import { Router } from "express";
import requireUser from "../../../Middleware/requireUser";
import NotificationController from "./controller";
const NotificationRouter = Router();

NotificationRouter.route("/").post(requireUser, NotificationController.createNotification);
NotificationRouter.route("/:receiverId").get(requireUser,NotificationController.getNotifications);


export default NotificationRouter;
