import { MarketUrl } from "@/config/Axios";

export const createProduct = (product:FormData)=> {
    return MarketUrl.post("/product", product,{headers:{'Content-Type':'multipart/form-data'}});
}