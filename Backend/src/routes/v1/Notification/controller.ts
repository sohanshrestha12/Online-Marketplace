import { NextFunction, Request, Response } from "express";
import { NotificationInterface } from "./models";
import { successResponse } from "../../../utils/HttpResponse";
import NotificationService from "./service";

const NotificationController = {
  async createNotification(
    req: Request<unknown, unknown, NotificationInterface>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = req.body;
      const notifications = await NotificationService.createNotification(body);
      return successResponse({
        response: res,
        message: "Created notification successfully",
        data: notifications,
        status: 201,
      });
    } catch (error) {
      next(error);
    }
  },
  async getNotifications(
    req: Request<{ receiverId: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { receiverId } = req.params;
      const notifications = await NotificationService.getNotifications(
        receiverId
      );
      return successResponse({
        response: res,
        message: "Fetched notification successfully",
        data: notifications,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default NotificationController;
