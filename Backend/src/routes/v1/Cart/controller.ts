import { NextFunction, Request, Response } from "express";
import { successResponse } from "../../../utils/HttpResponse";
import CartService from "./services";
import { CartType } from "./types";

const CartController = {
  async getCartProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user._id;
      const result = await CartService.getCartProducts(userId);
      return successResponse({
        response: res,
        message: "Fetched user cart successfully",
        data: result,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  },
  async addToCart(
    req: Request<unknown, unknown, CartType>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = res.locals.user._id;
      const body = req.body;
      const result = await CartService.addToCart(userId, body);
      return successResponse({
        response: res,
        message: "Cart added successfully",
        data: result,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default CartController;
