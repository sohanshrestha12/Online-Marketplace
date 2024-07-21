import { NextFunction, Request, Response } from "express";
import { ratingBody } from "./types";
import { successResponse } from "../../../utils/HttpResponse";
import RatingService from "./service";

const RatingController = {
  async addRating(
    req: Request<{ productId: string }, unknown, ratingBody>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { productId } = req.params;
      const userId = res.locals.user._id;
      const body = req.body;
      const newRating = await RatingService.addRating(productId, userId, body);
      return successResponse({
        response: res,
        message: "Successfully added rating the product",
        data: newRating,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default RatingController;
