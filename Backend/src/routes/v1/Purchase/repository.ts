import mongoose, { FilterQuery, Types } from "mongoose";
import { isInteger } from "../../../utils";
import CustomError from "../../../utils/Error";
import ProductService from "../Product/services";
import { PurchaseModel, PurchaseProduct } from "./model";
import { PurchasedProductQuery, PurchasedProductReturn, Purchases } from "./types";
import { User } from "../Users/model";

export const addPurchaseProduct = async (
  body: PurchaseProduct
): Promise<PurchaseProduct> => {
  await ProductService.getProductById(body.productId.toString());
  const purchasedProduct = new PurchaseModel(body);
  return purchasedProduct.save();
};

export const getPurchaseProduct = async (
  userId: string,
  query: PurchasedProductQuery
): Promise<PurchasedProductReturn> => {
  const { page = "1", limit } = query;

  const conditions: FilterQuery<PurchasedProductQuery> = {};
  if (!mongoose.Types.ObjectId.isValid(userId))
    throw new CustomError("Invalid Id", 400);
  conditions.userId = new mongoose.Types.ObjectId(userId);

  const pageSize = limit && isInteger(limit) ? parseInt(limit) : 10;
  const skip = isInteger(page)
    ? parseInt(page) * pageSize - pageSize
    : 1 * pageSize - pageSize;

    const purchasedProductDocument = PurchaseModel.find(conditions)
      .skip(skip)
      .limit(pageSize)
      .populate('productId')
      .lean();
 const totalPurchasedProductDocs = PurchaseModel.countDocuments(conditions);
 const [purchasedProductList, totalPurchasedProduct] = await Promise.all([
   (await purchasedProductDocument).reverse(),
   totalPurchasedProductDocs,
 ]);

 return {
   purchasedProductList,
   totalPurchasedProduct,
   page: parseInt(page),
   totalPage: Math.ceil(totalPurchasedProduct / pageSize),
   limit: pageSize,
 };
};

export const getSalesDataByMonth = async (sellerId: string) => {
  return await PurchaseModel.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: "$product",
    },
    {
      $match: {
        "product.createdBy": new Types.ObjectId(sellerId),
      },
    },
    {
      $group: {
        _id: {$month:'$createdAt'},
        totalSold: { $sum: "$quantity" },
      },
    },
    {
      $project:{
        _id:0,
        month:'$_id',
        totalSold:1
      }
    }
  ]);
};

export const getAllPurchases = async():Promise<Purchases[]> =>{
  const purchases =  PurchaseModel.find({})
    .populate({
      path: "userId",
      select: "-password -__v -createdAt -updatedAt", 
    })
    .populate("productId");
    return purchases as unknown as Purchases[];
}


export const getCustomers = async(sellerId:string) =>{
  const purchases = await getAllPurchases();
  const uniqueUserIds = new Set<User>();

  for(const purchase of purchases){
    const {productId,userId} = purchase;
    if(productId.createdBy.equals(sellerId)){
      uniqueUserIds.add(userId);
    }
  }
  return Array.from(uniqueUserIds).reverse();
};