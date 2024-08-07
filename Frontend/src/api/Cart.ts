import { MarketUrl } from "@/config/Axios";
import "../config/AxiosInterceptor";

export const addToCart = (
  productId: string,
  quantity: number,
  selectedColor: string,
  selectedSize: number
) => {
  return MarketUrl.post("/cart/add", { productId, quantity,selectedColor,selectedSize });
};
export const getCartItems = () => {
  return MarketUrl.get("/cart");
};

export const getTotalCartProduct = () =>{
  return MarketUrl.get("/cart/totalCartProduct");
} 
