import { NextFunction, Request, Response } from "express";
import { Product } from "./model";

const ProductController = {
  async createProduct(req: Request<unknown,unknown,Product>, res: Response, next: NextFunction) {
    try {
        const body = req.body; 
        console.log(req.files);
        console.log('body',req.body);
        res.json(body);
    } catch (error) {
      next(error);
    }
  },
};

export default ProductController;
