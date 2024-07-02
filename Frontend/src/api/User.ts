import { MarketUrl } from "@/config/Axios";
import "../config/AxiosInterceptor";


export const updateImage = (image: FormData) => {
  return MarketUrl.post("/users/profileImage", image, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

