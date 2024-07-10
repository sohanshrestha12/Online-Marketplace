import { getAllProducts } from "@/api/Product";
import { FetchFilterProduct, FetchProduct } from "@/pages/ProductDetails";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ProductContextValue {
  products: FetchProduct[];
  addProduct: (product: FetchProduct) => void;
  fetchDashboardProducts: (userId: string, page?: number) => void;
  dashboardProducts: FetchFilterProduct | undefined;
  deleteProductState: (productId: string) => void;
}
interface ProductProviderProps {
  children: ReactNode;
}

const ProductContext = createContext<ProductContextValue>({
  products: [],
  addProduct: () => {},
  fetchDashboardProducts: () => {},
  dashboardProducts: undefined,
  deleteProductState: () => {},
});

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<FetchProduct[]>([]);
  const [dashboardProducts, setDashboardProducts] = useState<
    FetchFilterProduct | undefined
  >(undefined);

  const addProduct = (product: FetchProduct) => {
    setProducts((prevProduct) => [product, ...prevProduct]);
  };

 const deleteProductState = (productId: string) => {
   setDashboardProducts((prevState) => {
     if (!prevState) return undefined;

     const updatedProducts = prevState.product.filter(
       (product) => product._id !== productId
     );

     return {
       ...prevState,
       product: updatedProducts,
     };
   });
 };
  const fetchDashboardProducts = async (userId: string, page?: number) => {
    try {
      setDashboardProducts(undefined);
      const response = await getAllProducts({ createdBy: userId, page: page });
      console.log("dashboard products", response);
      setDashboardProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchAllProduct = async () => {
      try {
        const response = await getAllProducts({ limit: 12 });
        console.log("all products", response.data.data);
        setProducts(response.data.data.product);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllProduct();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        fetchDashboardProducts,
        dashboardProducts,
        deleteProductState,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
