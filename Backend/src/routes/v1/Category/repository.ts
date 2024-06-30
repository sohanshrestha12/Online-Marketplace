import { CategoryModel } from "./model";

export const getAllCategory = () =>{
    return CategoryModel.find({});
}

