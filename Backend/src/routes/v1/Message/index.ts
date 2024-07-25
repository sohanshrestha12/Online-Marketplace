import { Router } from "express";
import requireUser from "../../../Middleware/requireUser";
import MessageController from "./controller";

const MessageRouter = Router();

MessageRouter.route('/').post(requireUser,MessageController.createMessage);
MessageRouter.route('/:roomId').get(requireUser,MessageController.getPrivateMessages);

export default MessageRouter;