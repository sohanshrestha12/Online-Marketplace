import { NextFunction, Request, Response } from "express";
import { successResponse } from "../../../utils/HttpResponse";
import FavouriteProductService from "./service";

const FavouriteProductController = {
  async getAllUserFavourites(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user._id;
      const result = await FavouriteProductService.getAllUserFavourites(userId);

      return successResponse({
        response: res,
        message: "Retrieved all favourite product successfully",
        data: result,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  },
  async getFavourite(
    req: Request<{ productId: string }>,
    res: Response,
    next: NextFunction
  ) {
    const { productId } = req.params;
    const userId = res.locals.user._id;
    const result = await FavouriteProductService.getFavourite(
      productId,
      userId
    );

    return successResponse({
      response: res,
      message: "Retrieved favourite product successfully",
      data: result,
      status: 201,
    });
  },

  async createFavourite(
    req: Request<{ productId: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { productId } = req.params;
      const userId = res.locals.user._id;
      const result = await FavouriteProductService.createFavourite(
        productId,
        userId
      );
      return successResponse({
        response: res,
        message: "Liked successfully",
        data: result,
        status: 201,
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteFavourite(
    req: Request<{ productId: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { productId } = req.params;
      const userId = res.locals.user._id;
      const result = await FavouriteProductService.deleteFavourite(
        productId,
        userId
      );
      return successResponse({
        response: res,
        message: "Disliked successfully",
        data: result,
        status: 201,
      });
    } catch (error) {
      next(error);
    }
  },
};
export default FavouriteProductController;
