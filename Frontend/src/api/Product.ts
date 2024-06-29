import { MarketUrl } from "@/config/Axios";

export const createProduct = (product:FormData)=> {
    return MarketUrl.post("/product", product,{headers:{'Content-Type':'multipart/form-data'}});
}

export const getAllCategories = () =>{
    return MarketUrl.get("/category");
} 

export const getAllBrands = () => {
    return MarketUrl.get("/brand");
}

export const getAllProducts = () => {
  return MarketUrl.get("/product");
};
export const getProductById = (id:string) => {
  return MarketUrl.get(`/product/${id}`);
};