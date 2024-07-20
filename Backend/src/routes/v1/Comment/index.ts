import { Router } from "express";
import CommentsController from "./Controller";
import requireUser from "../../../Middleware/requireUser";

const CommentsRouter = Router({mergeParams:true});

CommentsRouter.route("/").post(requireUser, CommentsController.createComment);


export default CommentsRouter;