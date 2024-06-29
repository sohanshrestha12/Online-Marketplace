import { NextFunction, Request, Response } from "express";
import { Product } from "./model";
import CustomError from "../../../utils/Error"
import { successResponse } from "../../../utils/HttpResponse";
import ProductService from "./services";

const ProductController = {
  async createProduct(
    req: Request<unknown, unknown, Product>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = req.body;
      const files = req.files as Express.Multer.File[];
      if (!files) throw new CustomError("Image is required", 404);
      const filesPath = files.map((file) => file.path.replace("uploads\\", ""));
      const product = await ProductService.createProduct(body, filesPath);
      return successResponse({
        response: res,
        message: "Product created successfully",
        data: product,
        status: 201,
      });
    } catch (error) {
      next(error);
    }
  },
  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await ProductService.getAllProducts();
      return successResponse({
        response: res,
        message: "Product fetched successfully",
        data: product,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  },
  async getProductById(
    req: Request<{ id: string }, unknown, unknown>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const result = await ProductService.getProductById(id);
      return successResponse({
        response: res,
        message: "Successfully retrieved the product",
        data: result,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default ProductController;
