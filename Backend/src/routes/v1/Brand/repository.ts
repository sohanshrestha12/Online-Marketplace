import { Brand, BrandModel } from "./model"

export const getAllBrand = ():Promise<Brand[]> =>{
    return BrandModel.find({})
}
export const getCategoryBrand = (
  category: string | { $regex: RegExp } | undefined,
) => {
  return BrandModel.find({ category: category });
};