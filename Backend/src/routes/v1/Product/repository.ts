import mongoose, { FilterQuery, SortOrder, Types } from "mongoose";
import { isInteger } from "../../../utils";
import CustomError from "../../../utils/Error";
import { CategoryModel } from "../Category/model";
import { Comment } from "../Comment/model";
import { Product, ProductModel } from "./model";
import ProductService from "./services";
import {
  ProductQuery,
  ProductReturn,
  SearchQuery,
  updateProducts,
} from "./types";

export const createProduct = (
  body: Product,
  files: string[],
  user: string
): Promise<Product> => {
  const product = new ProductModel({ ...body, images: files, createdBy: user });
  return product.save();
};

export const getAllProducts = async (
  query: ProductQuery
): Promise<ProductReturn> => {
  const { page = "1", limit, sort, title, category, createdBy,shortField,sortOrder } = query;
  const conditions: FilterQuery<ProductQuery> = {};
  const sortQuery: { [key:string]: SortOrder } = {};
 
  if (category) {
    conditions.category = {
      $regex: category,
      $options: "i",
    };
  }
  if (createdBy) {
    if (!mongoose.Types.ObjectId.isValid(createdBy))
      throw new CustomError("Invalid Id", 400);
    conditions.createdBy = new mongoose.Types.ObjectId(createdBy);
  }

  if (title) {
    conditions.name = {
      $regex: title,
      $options: "i",
    };
  }
  if(shortField){
    sortQuery[shortField] = sortOrder === "des" ? "desc" : "asc";
  }
  else if (sort) {
    sortQuery.createdAt = sort === "desc"?"desc":"asc";
  }

  const pageSize = limit && isInteger(limit) ? parseInt(limit) : 10;
  const skip = isInteger(page)
    ? parseInt(page) * pageSize - pageSize
    : 1 * pageSize - pageSize;

  const productDocuments = ProductModel.find(conditions)
    .sort(sortQuery)
    .skip(skip)
    .limit(pageSize)
    .lean();

  const totalProductDocs = ProductModel.countDocuments(conditions);

  const [productList, totalProduct] = await Promise.all([
    productDocuments,
    totalProductDocs,
  ]);
  const product = await Promise.all(
    productList.map(async (product) => {
      const c3 = await CategoryModel.findOne({
        name: product.category,
      }).lean();
      const c2 = await CategoryModel.findOne({ name: c3?.parent }).lean();
      const c1 = await CategoryModel.findOne({ name: c2?.parent }).lean();

      const categoryString = [c1?.name, c2?.name, c3?.name]
        .filter(Boolean)
        .join("/");

      return {
        ...product,
        category: categoryString,
      };
    })
  );

  return {
    product,
    totalProduct,
    page: parseInt(page),
    totalPage: Math.ceil(totalProduct / pageSize),
    limit: pageSize,
  };
};

export const updateProduct = async (
  body: updateProducts,
  files: string[],
  user: string
) => {
  if (!body || !files || !user) {
    throw new CustomError("Invalid request parameters", 400);
  }
  await ProductService.getProductById(body.id);
  const existingImages = Array.isArray(body.existingImage)
    ? body.existingImage
    : body.existingImage
    ? [body.existingImage]
    : [];
  const mergedImages = [...existingImages, ...files];

  const c3 = await CategoryModel.findOne({ name: body.category }).lean();
  const c2 = await CategoryModel.findOne({ name: c3?.parent }).lean();
  const c1 = await CategoryModel.findOne({ name: c2?.parent }).lean();
  const categoryString = [c1?.name, c2?.name, c3?.name]
    .filter(Boolean)
    .join("/");
  body.images = mergedImages;

  const updatedProduct = await ProductModel.findByIdAndUpdate(
    body.id,
    { ...body, createdBy: user },
    { new: true }
  );
  return { updatedProduct, categoryString };
};
export const getProductById = async (id: string): Promise<Product | null> => {
  const product = await ProductModel.findById(id).populate({
    path: "comments",
    populate: { path: "user", select: "-password" },
  }).populate({
    path:"rating" 
  }).populate({
    path:"createdBy"
  });
  if (!product) {
    throw new CustomError("Invalid id", 404);
  }
  const c3 = await CategoryModel.findOne({ name: product?.category }).lean();
  const c2 = await CategoryModel.findOne({ name: c3?.parent }).lean();
  const c1 = await CategoryModel.findOne({ name: c2?.parent }).lean();
  // removes any null or undefined values from the array before joining.
  const categoryString = [c1?.name, c2?.name, c3?.name]
    .filter(Boolean)
    .join("/");
const comments = product.comments as Comment[];
  const reversedComments = comments
    ? comments.slice().reverse()
    : [];

  const modifiedProduct: Product = {
    _id: product._id,
    name: product.name,
    description: product.description,
    category: categoryString,
    brand: product.brand,
    colorFamily: product.colorFamily,
    price: product.price,
    quantity: product.quantity,
    size: product.size,
    images: product.images,
    comments: reversedComments,
    createdAt: product.createdAt,
    createdBy: product.createdBy,
    rating:product.rating,
    videoUrl:product.videoUrl,
  };
  return modifiedProduct;
};

export const filterProducts = async (
  query: SearchQuery
): Promise<Product[] | null> => {
  return ProductModel.find(query);
};

export const removeQuantity = async (productId: string, quantity: number) => {
  const product = await ProductModel.findByIdAndUpdate(
    productId,
    { $inc: { quantity: -quantity } },
    { new: true }
  );
  return product;
};

export const deleleteProduct = async (id: string, userId: string) => {
  const product = await ProductModel.findOne({ _id: id, createdBy: userId });
  if (!product) {
    throw new CustomError(
      "You do not have permission to delete this product or it does not exist.",
      403
    );
  }
  return ProductModel.findOneAndDelete({ _id: id, createdBy: userId });
};

export const deleteMultipleProducts = async (ids: string[], userId: string) => {
  return ProductModel.deleteMany({
    _id: { $in: ids },
    createdBy: userId,
  });
};

export const addCommentToProduct = async(productId: string, commentId: string) => {
  await getProductById(productId);
  return ProductModel.findByIdAndUpdate(
    productId,
    {
      $push: {
        comments: new mongoose.Types.ObjectId(commentId),
      },
    },
    { new: true }
  );
};

export const addRatingToProduct = async(productId:string,ratingId:string) =>{
 const product = await getProductById(productId);
   if (!product) {
     throw new CustomError("Product not found",404);
   }
   if (product.rating?.some((r) => r._id.equals(ratingId))) {
     return product;
   }
 

  return ProductModel.findByIdAndUpdate(
    productId,
    {
      $push:{
        rating: new mongoose.Types.ObjectId(ratingId),
      },
    },{
      new:true,
    }
  )

}
export const updateQuantityProduct=async(productId:string,quantity:number)=>{
  const product = await ProductModel.findById(productId);
  if(!product) throw new CustomError("Product not found!!!",404);
  if(product.quantity < quantity) throw new CustomError("Insufficient product quantity",400);
  product.quantity -=quantity;
  return product.save();
}

export const getCreatedDataByMonth=async(sellerId:string)=>{
  return ProductModel.aggregate([
    {
      $match:{
        createdBy: new Types.ObjectId(sellerId),
      }
    },
    {
      $group:{
        _id:{$month:'$createdAt'},
        totalCreated:{$sum:1},
      }
    },
    {
      $project:{
        _id:0,
        month:'$_id',
        totalCreated:1,
      }
    }
  ])
};
