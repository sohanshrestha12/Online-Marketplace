import mongoose, { FilterQuery, SortOrder } from "mongoose";
import CustomError from "../../../utils/Error";
import { CategoryModel } from "../Category/model";
import { Product, ProductModel } from "./model";
import { ProductQuery, ProductReturn, SearchQuery } from "./types";
import { isInteger } from "../../../utils";

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
  const { page = "1", limit, sort, title, category, createdBy } = query;

  const conditions: FilterQuery<ProductQuery> = {};
  const sortQuery: { createdAt: SortOrder } = { createdAt: "asc" };

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
    conditions.title = {
      $regex: title,
      $options: "i",
    };
  }
  if (sort && sort === "desc") {
    sortQuery.createdAt = "desc";
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

  const [product, totalProduct] = await Promise.all([
    productDocuments,
    totalProductDocs,
  ]);

  return {
    product,
    totalProduct,
    page: parseInt(page),
    totalPage: Math.ceil(totalProduct / pageSize),
    limit:pageSize,
  };
};
export const getProductById = async (id: string): Promise<Product | null> => {
  const product = await ProductModel.findById(id);
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
    createdAt: product.createdAt,
    createdBy: product.createdBy,
  };
  return modifiedProduct;
};

export const filterProducts = async (
  query: SearchQuery
): Promise<Product[] | null> => {
  if (!query.category) {
    return ProductModel.find({});
  }
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

export const deleleteProduct = async (id: string,userId:string) => {
  const product = await ProductModel.findOne({ _id: id, createdBy: userId });
  if (!product) {
    throw new CustomError(
      "You do not have permission to delete this product or it does not exist.",
      403
    );
  }
  return ProductModel.findOneAndDelete({ _id: id, createdBy: userId });
};

export const deleteMultipleProducts = async (ids: string[],userId:string) => {
  return ProductModel.deleteMany({
    _id: { $in: ids },
    createdBy: userId,
  });
};
