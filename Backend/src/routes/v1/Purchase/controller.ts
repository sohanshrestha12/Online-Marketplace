import { NextFunction, Request, Response } from "express"
import { PurchaseProduct } from "./model";
import { successResponse } from "../../../utils/HttpResponse";
import PurchaseProductService from "./service";

const PurchaseProductController = {
    async addPurchaseProduct(req:Request<unknown,unknown,PurchaseProduct>,res:Response,next:NextFunction){
        try {
            const body = req.body;
            const response = await PurchaseProductService.addPurchaseProduct(body);
            return successResponse({
              response: res,
              message: "Product purchased successfully",
              data: response,
              status: 201,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default PurchaseProductController