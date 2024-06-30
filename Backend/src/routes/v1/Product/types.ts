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
