import { NextFunction, Request, Response } from "express";
import { MessageInterface } from "./models";
import { successResponse } from "../../../utils/HttpResponse";
import MessageService from "./service";

const MessageController = {
  async createMessage(
    req: Request<unknown, unknown, MessageInterface>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = req.body;
      const message = await MessageService.createMessage(body);
      return successResponse({
        response: res,
        message: "Created Message successfully",
        data: message,
        status: 201,
      });
    } catch (error) {
      next(error);
    }
  },
  async getPrivateMessages(req:Request<{roomId:string}>,res:Response,next:NextFunction){
    try {
      const {roomId} = req.params;
      const privateMessages = await MessageService.getPrivateMessages(roomId);
       return successResponse({
         response: res,
         message: "Fetched Private Messages successfully",
         data: privateMessages,
         status: 200,
       });
    } catch (error) {
      next(error);
    }
  },
};

export default MessageController;
