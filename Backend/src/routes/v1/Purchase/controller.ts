import { NextFunction, Request, Response } from "express"
import { PurchaseProduct } from "./model";
import { successResponse } from "../../../utils/HttpResponse";
import PurchaseProductService from "./service";
import { PurchasedProductQuery } from "./types";

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
    },
    async getPurchaseProduct(req:Request<unknown,unknown,unknown,PurchasedProductQuery>,res:Response,next:NextFunction){
        try {
            const userId = res.locals.user._id;
            const query = req.query;
            const response = await PurchaseProductService.getPurchaseProduct(userId,query);
             return successResponse({
               response: res,
               message: "Fetched purchase product successfully",
               data: response,
               status: 200,
             });
        } catch (error) {
            next(error);
        }
    }
}

export default PurchaseProductController