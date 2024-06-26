import {Request, NextFunction, Response } from "express";
import { successResponse } from "../../../utils/HttpResponse";
import CategoryService from "./services";

const CategoryController ={
    async getAllCategory(req:Request,res:Response,next:NextFunction){
        try {
            const result = await CategoryService.getAllCategory();
            return successResponse({
              response: res,
              message: "Fetched categories successfully",
              data: result,
            });

        } catch (error) {
            next(error);
        }
    }
}

export default CategoryController;