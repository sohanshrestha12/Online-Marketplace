import { FavouriteModel, FavouriteProductInterface } from "./model";

export const getAllUserFavourites = async(userId:string):Promise<FavouriteProductInterface[]>=>{
    return FavouriteModel.find({userId}).populate('productId');
}
export const createFavourite = async(productId:string,userId:string):Promise<FavouriteProductInterface>=>{
    const favouriteProduct = new FavouriteModel({userId,productId});
    return favouriteProduct.save();
}
export const deleteFavourite = async(productId:string,userId:string):Promise<FavouriteProductInterface | null>=>{
    return FavouriteModel.findOneAndDelete({userId,productId});
}
export const getFavourite = async (
  productId: string,
  userId: string
): Promise<boolean> => {
  const favProduct = await FavouriteModel.findOne({ userId, productId });
  if(favProduct){
    return true;
  }
  return false;
};