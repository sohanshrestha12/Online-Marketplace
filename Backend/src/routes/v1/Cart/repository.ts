import CustomError from "../../../utils/Error";
import { Product } from "../Product/model";
import { getProductById, removeQuantity, updateCartQuantity } from "../Product/repository";
import { Cart, CartModel } from "./model";
import { AllCart, CartType } from "./types";

export const getCartProducts = async (userId: string): Promise<Cart[]> => {
  return CartModel.find({ userId: userId }).populate("productId");
};
export const getAllCartProducts = async (): Promise<AllCart[]> => {
  const cartProducts = await CartModel.find({}).populate("productId");
  return cartProducts;
};

export const addToCart = async (uid: string, body: CartType): Promise<Cart> => {
  const { quantity, productId, selectedSize, selectedColor } = body;

  const cartItem = await CartModel.findOne({
    userId: uid,
    productId,
    selectedColor,
    selectedSize,
  });
  const product = await getProductById(productId);
  if (!product) throw new CustomError("No available product", 400);
  if (product) {
    if (product?.quantity < quantity)
      throw new CustomError("Dont have that many quantity", 400);
  }
  if (cartItem) {
    cartItem.quantity += quantity;
    await removeQuantity(productId, quantity);
    return cartItem.save();
  } else {
    const newCartItem = new CartModel({
      userId: uid,
      productId,
      quantity,
      selectedColor,
      selectedSize,
    });
    await removeQuantity(productId, quantity);
    return newCartItem.save();
  }
};

export const getTotalCartProduct = async (
  sellerId: string
): Promise<number> => {
  const cartProduct = await getAllCartProducts();
  // const matchingProduct = cartProduct.filter((cartProduct)=> cartProduct.productId.createdBy.equals(sellerId));
  const matchingProduct = cartProduct.filter((cartProduct) => {
    const product = cartProduct.productId as Product;
    return product.createdBy && product.createdBy.equals(sellerId);
  });
  return matchingProduct.length;
};

export const removeCartItems = async (cartId: string) => {
  const cartItem = await CartModel.findById(cartId);
  if (!cartItem) {
    throw new CustomError("Cart item not Found", 400);
  }
  const { productId, quantity } = cartItem;

  const product = await getProductById(productId.toString());
  if(!product) throw new CustomError("Product not found",400);
  product.quantity += quantity;
  await updateCartQuantity(productId.toString(),product.quantity);
  return CartModel.findByIdAndDelete(cartId); 
};
