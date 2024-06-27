import { NextFunction, Request, Response } from "express";
import { successResponse } from "../../../utils/HttpResponse";
import BrandService from "./services";

const BrandController = {
  async getAllBrand(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await BrandService.getAllBrand();
      return successResponse({
        response: res,
        message: "Fetched brands successfully",
        data: result,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default BrandController;
