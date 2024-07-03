import { MarketUrl } from "@/config/Axios";
import "../config/AxiosInterceptor";

export const addToCart = (productId:string,quantity:number) => {
  return MarketUrl.post("/cart/add",{productId,quantity});
};
export const getCartItems = () => {
  return MarketUrl.get("/cart");
};
