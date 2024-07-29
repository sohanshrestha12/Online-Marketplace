import { NextFunction, Request, Response } from "express";
import CustomError from "../../../utils/Error";
import { successResponse } from "../../../utils/HttpResponse";
import { Product } from "./model";
import ProductService from "./services";
import { ProductQuery, SearchQuery, updateProducts } from "./types";

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
      if (!files) throw new CustomError("Image is required", 400);
      const filesPath = files.map((file) => file.path.replace("uploads\\", ""));
      const product = await ProductService.createProduct(body, filesPath, user);
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
  async updateProduct(
    req: Request<unknown, unknown, updateProducts>,
    res: Response,
    next: NextFunction
  ) {
    try {

      const body = req.body;
      const files = req.files as Express.Multer.File[];
      const user = res.locals.user;


      if (!files && !body.existingImage) {
        throw new CustomError("Image is Required", 400);
      }
      const filesPath = files.map((file) => file.path.replace("uploads\\", ""));

      const product = await ProductService.updateProduct(body, filesPath, user);

      return successResponse({
        response: res,
        message: "Product updated successfully",
        data: product,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  },
  async getAllProducts(
    req: Request<unknown, unknown, unknown, ProductQuery>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const query = req.query;
      console.log(query);
      const product = await ProductService.getAllProducts(query);
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
      const { category, brand, colorFamily, minPrice, maxPrice } = req.query;
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
  async deleteProduct(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const userId = res.locals.user._id;
      const result = await ProductService.deleteProduct(id, userId);

      return successResponse({
        response: res,
        message: "Successfully deleted the product",
        data: result,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteMultipleProduct(
    req: Request<unknown, unknown, string[]>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const ids = req.body;
      const userId = res.locals.user._id;
      const result = await ProductService.deleteMultipleProduct(ids, userId);

      return successResponse({
        response: res,
        message: "Successfully deleted the product",
        data: result,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  },
  async getCreatedDataByMonth(req:Request,res:Response,next:NextFunction){
    try {
      const sellerId = res.locals.user._id;
      const result = await ProductService.getCreatedDataByMonth(sellerId);

      return successResponse({
        response: res,
        message: "Successfully retrieved created product by month",
        data: result,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  }
};

export default ProductController;
