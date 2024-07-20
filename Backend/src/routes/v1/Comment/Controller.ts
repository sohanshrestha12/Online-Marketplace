import { NextFunction, Request, Response } from "express";
import { successResponse } from "../../../utils/HttpResponse";
import CommentsService from "./service";
import { Comment } from "./model";

const CommentsController = {
  async createComment(
    req: Request<{ productId: string }, unknown, Comment>,
    res: Response,
    next:NextFunction,
  ) {
    try {
      const { productId } = req.params;
      const body = req.body;
      const userId = res.locals.user._id;
      body.user = userId;
      const result = await CommentsService.createComment(body, productId);
      return successResponse({
        response: res,
        message: 'Successfully created a comment',
        data: result,
        status: 201,
      });
    } catch (error) {
      next(error);
    }
  },
};
export default CommentsController;