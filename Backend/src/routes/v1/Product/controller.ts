import { NextFunction, Request, Response } from "express";
import { Product } from "./model";
import CustomError from "../../../utils/Error";
import { successResponse } from "../../../utils/HttpResponse";
import ProductService from "./services";
import { SearchQuery } from "./types";

const ProductController = {
  async createProduct(
    req: Request<unknown, unknown, Product>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = req.body;
      const files = req.files as Express.Multer.File[];
      const user = res.locals.user;
      if (!files) throw new CustomError("Image is required", 404);
      const filesPath = files.map((file) => file.path.replace("uploads\\", ""));
      const product = await ProductService.createProduct(body, filesPath,user);
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

  async filterProducts(
    req: Request<any, any, any, SearchQuery>,
    res: Response,
    next: NextFunction
  ) {
    try {
      let query: SearchQuery = {};
      const { category, brand,colorFamily,minPrice,maxPrice } = req.query;
      if (category) {
        const normalizedCategory = (category as string)
          .replace(/[^a-zA-Z0-9]/g, "")
          .toLowerCase();
        query.category = {
          $regex: new RegExp(
            normalizedCategory.split("").join("[^a-zA-Z0-9]*"),
            "i"
          ),
        };
      }
      if (brand) {
        if (typeof brand === "string") {
          query.brand = brand; // Assign single brand string directly
        } else if (Array.isArray(brand)) {
          query.brand = { $in: brand }; // Use $in operator for array of brands
        }
      }
      if (colorFamily) {
        if (typeof colorFamily === "string") {
          query.colorFamily = new RegExp(colorFamily, "i"); // Case insensitive regex
        } else if (Array.isArray(colorFamily)) {
          query.colorFamily = {
            $in: colorFamily.map((color) => new RegExp(color, "i")),
          };
        } else if (colorFamily instanceof RegExp) {
          query.colorFamily = colorFamily;
        }
      }
       if (minPrice && maxPrice) {
         query.price = {
           $gte: parseFloat(minPrice),
           $lte: parseFloat(maxPrice),
         };
       } else if (minPrice) {
         query.price = { $gte: parseFloat(minPrice) };
       } else if (maxPrice) {
         query.price = { $lte: parseFloat(maxPrice) };
       }
      const { categoryBrand, filter } = await ProductService.filterProducts(
        query
      );
      return successResponse({
        response: res,
        message: "Successfully retrieved the filtered product",
        data: { categoryBrand, filter },
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default ProductController;
