import { Product } from "./model";

export interface SearchQuery {
  search?: string;
  name?: string | { $regex: RegExp };
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
  $or?: Array<{ [key: string]: { $regex: RegExp } }>;
}

export interface ProductQuery {
  createdBy?: string;
  page?: string;
  limit?: string;
  sort?: string;
  title?: string;
  category?: string;
  shortField?:string,
  sortOrder?:string,
}

export interface ProductReturn {
  product: Product[];
  totalProduct: number;
  page: number;
  totalPage: number;
  limit: number;
}

export interface updateProducts {
  id: string;
  createdAt?: string;
  name: string;
  description: string;
  category: string;
  brand?: string;
  price: number;
  colorFamily: string[];
  size: number;
  quantity: number;
  rating?: number;
  videoUrl?: string;
  images?: string[] | File[];
  existingImage?:string[];
}
