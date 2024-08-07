import CustomError from "../../../utils/Error";
import { getProductById, removeQuantity } from "../Product/repository";
import { Cart, CartModel } from "./model";
import { CartType } from "./types";

export const getCartProducts = async (userId: string): Promise<Cart[]> => {
  return CartModel.find({ userId: userId }).populate('productId');
};
export const getAllCartProducts = async (): Promise<Cart[]> => {
  return CartModel.find({}).populate('productId');
};

export const addToCart = async (uid: string, body: CartType): Promise<Cart> => {
  const { quantity, productId,selectedSize,selectedColor } = body;

  const cartItem = await CartModel.findOne({ userId:uid, productId, selectedColor,selectedSize });
  const product = await getProductById(productId);
  if(!product) throw new CustomError("No available product",400);
  if (product) {
    if (product?.quantity < quantity)
      throw new CustomError("Dont have that many quantity", 400);
  }
  if (cartItem) {
    cartItem.quantity += quantity;
    await removeQuantity(productId,quantity);
    return cartItem.save();
  } else {
    const newCartItem = new CartModel({ userId:uid, productId, quantity,selectedColor,selectedSize });
    await removeQuantity(productId,quantity);
    return newCartItem.save();
  }
};

export const getTotalCartProduct = async(sellerId:string):Promise<number> =>{
  const cartProduct = await getAllCartProducts();
  const matchingProduct = cartProduct.filter((cartProduct)=> cartProduct.productId.createdBy.equals(sellerId));

  return matchingProduct.length;
} ;
