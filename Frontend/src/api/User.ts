import { MarketUrl } from "@/config/Axios";
import "../config/AxiosInterceptor";
import { SellerUser } from "@/Types/Auth";
import { ProfileTypes } from "@/Types/User";


export const updateImage = (image: FormData) => {
  return MarketUrl.post("/users/profileImage", image, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const sellerRegistration = (values:SellerUser) =>{
  return MarketUrl.post("/users/sellerRegistration",values);
}

export const profileUpdate = (values:ProfileTypes)=>{
  return MarketUrl.post("/users/profileUpdate",values);
}

