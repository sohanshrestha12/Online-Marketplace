import { getAllProducts } from "@/api/Product";
import { FetchProduct } from "@/pages/ProductDetails";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface ProductContextValue {
    products:FetchProduct[];
}
interface ProductProviderProps{
    children:ReactNode;
}

const ProductContext = createContext<ProductContextValue>({
    products:[],
})


export const ProductProvider = ({children}:ProductProviderProps) => {
    const [products,setProducts] = useState<FetchProduct[]>([]);
    useEffect(()=>{
        const fetchAllProduct = async() =>{
            try {
                const response = await getAllProducts();
                console.log("all products",response.data.data);
                setProducts(response.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllProduct();
    },[]);

    return (
      <ProductContext.Provider value={{ products }}>
        {children}
      </ProductContext.Provider>
    );
}

export const useProduct = () => useContext(ProductContext);
