import { MarketUrl } from "@/config/Axios";
import "../config/AxiosInterceptor";

export const LikeProduct = (productId: string) => {
  return MarketUrl.post(`favourite/${productId}`);
};
export const DislikeProduct = (productId: string) => {
  return MarketUrl.delete(`favourite/${productId}`);
};
export const CheckLikeStatus = (productId:string) =>{
    return MarketUrl.get(`favourite/${productId}`);
}
export const getAllUserFavourites = () => {
  return MarketUrl.get('favourite');
};

