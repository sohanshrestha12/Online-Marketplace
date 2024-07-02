import { getAllProducts } from "@/api/Product";
import { FetchProduct } from "@/pages/ProductDetails";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface ProductContextValue {
    products:FetchProduct[];
    addProduct:(product:FetchProduct)=>void
}
interface ProductProviderProps{
    children:ReactNode;
}

const ProductContext = createContext<ProductContextValue>({
    products:[],
    addProduct:()=>{}
})


export const ProductProvider = ({children}:ProductProviderProps) => {
    const [products,setProducts] = useState<FetchProduct[]>([]);

    const addProduct = (product:FetchProduct)=>{
        setProducts(prevProduct => [product,...prevProduct])
    }
    useEffect(()=>{
        const fetchAllProduct = async() =>{
            try {
                const response = await getAllProducts();
                console.log("all products",response.data.data.reverse()
                );
                setProducts(response.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllProduct();
    },[]);

    return (
      <ProductContext.Provider value={{ products,addProduct }}>
        {children}
      </ProductContext.Provider>
    );
}

export const useProduct = () => useContext(ProductContext);
