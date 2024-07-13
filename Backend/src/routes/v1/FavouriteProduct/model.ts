import mongoose from "mongoose";

export interface FavouriteProductInterface{
    userId:mongoose.Types.ObjectId,
    productId:mongoose.Types.ObjectId,
}

const FavouriteProductSchema = new mongoose.Schema<FavouriteProductInterface>({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: [true, "User is Required"],
  },
  
  productId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Product',
    required: [true, "Product is Required"],
  },
  
},{
    timestamps:true,
});

export const FavouriteModel = mongoose.model<FavouriteProductInterface>("Favourite", FavouriteProductSchema);
