import CustomError from "../../../utils/Error";
import { CategoryModel } from "../Category/model";
import { Product, ProductModel } from "./model";

export const createProduct = (body:Product,files:string[]):Promise<Product> => {
    const product = new ProductModel({...body,images:files});
    return product.save();
}

export const getAllProducts = ():Promise<Product[]> =>{
    return ProductModel.find({});
}
export const getProductById = async(id: string): Promise<Product | null> => {
  const product = await ProductModel.findById(id);
   if (!product) {
     throw new CustomError("Invalid id",404);
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
  };;
  return modifiedProduct;
};