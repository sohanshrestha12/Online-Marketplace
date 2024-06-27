import { Brand, BrandModel } from "./model"

export const getAllBrand = ():Promise<Brand[]> =>{
    return BrandModel.find({})
}