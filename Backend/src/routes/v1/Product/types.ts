import { Product } from "./model";

export interface SearchQuery {
  search?: string;
  brand?: string | string[] | { $in: string[] };
  category?: string | { $regex: RegExp };
  minPrice?: string;
  maxPrice?: string;
  colorFamily?:
    | string
    | string[]
    | RegExp
    | RegExp[]
    | { $in: (string | RegExp)[] };
  price?: { $gte?: number; $lte?: number };
}


export interface ProductQuery {
  createdBy?:string,
  page?: string;
  limit?: string;
  sort?: string;
  title?: string;
  category?: string;
}

export interface ProductReturn {
  product: Product[];
  totalProduct: number;
  page: number;
  totalPage: number;
}