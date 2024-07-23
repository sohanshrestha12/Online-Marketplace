import mongoose, { Schema, Types } from "mongoose";

export interface PurchaseProduct{
    productId:Types.ObjectId,
    userId:Types.ObjectId,
    selectedColor:string,
    selectedSize:string,
    quantity:number,
    totalPrice:number
}

const purchaseProductSchema = new mongoose.Schema<PurchaseProduct>({
    productId:{
        type:Schema.Types.ObjectId,
        ref:"Product",
        required:true,
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    selectedColor:{
        type:String,
        required:true,
        unique:false,
    },
    selectedSize:{
        type:String,
        required:true,
        unique:false,
    },
    quantity:{
        type:Number,
        required:true,
        unique:false,
    },
    totalPrice:{
        type:Number,
        required:true,
        unique:false,
    },
},{timestamps:true});

export const PurchaseModel = mongoose.model<PurchaseProduct>("Purchase",purchaseProductSchema);