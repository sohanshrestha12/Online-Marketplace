import { MarketUrl } from "@/config/Axios";
import { Comment } from "@/Types/Comment";
import { purchaseProduct } from "@/Types/Product";
import { Rating } from "@/Types/Rating";
import "../config/AxiosInterceptor";


export const createProduct = (product: FormData) => {
  return MarketUrl.post("/product", product, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateProduct = (product:FormData)=>{
  return MarketUrl.patch("/product",product,{
    headers:{"Content-Type":"multipart/form-data"},
  })
}


export const getAllCategories = () => {
  return MarketUrl.get("/category");
};

export const getAllBrands = () => {
  return MarketUrl.get("/brand");
};

export const getAllProducts = (params: {
  page?: number;
  limit?: number;
  filter?: {
    category?:string,
    title?:string
  };
  createdBy?: string;
  shortField?:string,
  sortOrder?:string,
}) => {
  const { page,limit, filter, createdBy,shortField,sortOrder } = params;

  return MarketUrl.get("/product",{
    params:{
      page,
      limit,
      ...filter,
      createdBy,
      shortField,
      sortOrder
    }
  });
};
export const getProductById = (id: string) => {
  return MarketUrl.get(`/product/${id}`);
};

export const deleteProduct = (id:string)=>{
  return MarketUrl.delete(`/product/${id}`);
};

export const deleteMultiple = (ids:string[]) =>{
  return MarketUrl.post(`product/deleteMultiple`, ids);
};

export const createComment = (productId:string,data:Comment) =>{
  return MarketUrl.post(`product/${productId}/comment`,data);
}

export const createRating = (productId:string,data:Rating)=>{
  return MarketUrl.post(`product/${productId}/rating`,data);
}

export const PurchaseProduct = (body:purchaseProduct)=>{
  return MarketUrl.post('/purchase',body);
}

export const getPurchasedProduct = ({page=1}:{page?:number}={})=>{
  return MarketUrl.get('/purchase',{params:{page}});
}

export const getCreatedDataByMonth  = () =>{
  return MarketUrl.get("/product/getCreatedDataByMonth");
}

export const getSalesDataByMonth= () =>{
  return MarketUrl.get("/purchase/getSalesDataByMonth");
};

export const fetchProductsByFilter = (
  category?: string,
  brands?: string[],
  selectedColors?: string[],
  minPrice?:string,
  maxPrice?:string
) => {
  let url = `/product/filterProducts`;
  if (category) {
    url += `?category=${category}`;
  }
  if (brands && brands.length > 0) {
    const brandsQueryParam = brands.map((brand) => `brand=${brand}`).join("&");
    url += url.includes("?") ? `&${brandsQueryParam}` : `?${brandsQueryParam}`;
  }
  if (selectedColors && selectedColors.length > 0) {
    const colorsQueryParam = selectedColors
      .map((color) => `colorFamily=${encodeURIComponent(color)}`)
      .join("&");
    url += url.includes("?") ? `&${colorsQueryParam}` : `?${colorsQueryParam}`;
  }  
  if (minPrice) {
    url += url.includes("?")
      ? `&minPrice=${minPrice}`
      : `?minPrice=${minPrice}`;
  }
  if (maxPrice) {
    url += url.includes("?")
      ? `&maxPrice=${maxPrice}`
      : `?maxPrice=${maxPrice}`;
  }

  return MarketUrl.get(url);
};
