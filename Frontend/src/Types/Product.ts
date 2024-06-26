export interface Product {
  name: string;
  description: string;
  category:string;
  brand: string;
  price: number;
  colorFamily: string;
  size: number;
  quantity: number;
  rating?: number;
  videoUrl?:string;
  images: File[];
}
