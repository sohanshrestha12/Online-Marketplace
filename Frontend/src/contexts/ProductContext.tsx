import { createMessage } from "@/api/Message";
import { createNotification } from "@/api/Notification";
import { getAllProducts } from "@/api/Product";
import { FetchFilterProduct, FetchProduct } from "@/pages/ProductDetails";
import { User } from "@/Types/Auth";
import { FormikHelpers, FormikValues } from "formik";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket } from "socket.io-client";

interface ProductContextValue {
  products: FetchProduct[];
  addProduct: (product: FetchProduct) => void;
  fetchDashboardProducts: (
    userId: string,
    page?: number,
    category?: string
  ) => void;
  dashboardProducts: FetchFilterProduct | undefined;
  deleteProductState: (productId: string) => void;
  deleteMultipleProductState: (products: FetchProduct[]) => void;
  updateProductState: (
    updatedProduct: FetchProduct,
    fullCategory: string
  ) => void;
  toggleChat: () => void;
  showChat: boolean;
  handleMessageSubmit: (
    values: FormikValues,
    helpers: FormikHelpers<FormikValues>,
    socket: Socket,
    user: User,
    roomId: string,
    productId?:string
  ) => void;
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
  deleteMultipleProductState: () => {},
  updateProductState: () => {},
  toggleChat: () => {},
  showChat: false,
  handleMessageSubmit: () => {},
});

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<FetchProduct[]>([]);
  const [showChat, setShowChat] = useState<boolean>(false);

  const [dashboardProducts, setDashboardProducts] = useState<
    FetchFilterProduct | undefined
  >(undefined);
  useEffect(() => {
    console.log("This is the changing dashboard product", dashboardProducts);
  }, [dashboardProducts]);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const handleMessageSubmit = async(
    values: FormikValues,
    { resetForm }: FormikHelpers<FormikValues>,
    socket: Socket,
    user: User,
    roomId: string,
    productId?:string,
  ) => {
    if (user && socket) {
      try {
        await createMessage({roomId,senderId:user._id,message:values.message});
        const ids = roomId.split("-");
        const receiverId = ids[1];
        if(user._id !== receiverId){
          const notification = await createNotification({receiverId,senderId:user._id,message:values.message,productId });
          console.log('this is notification',notification);
        }
        socket.emit("sendMessage", {
          roomId: roomId,
          senderId: user?._id,
          message: values.message,
          senderDetails: user,
        });
      } catch (error) {
        console.log(error);
      }
      console.log("sending the message: ", roomId, values.message);
    }
    resetForm();
  };

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

  const updateProductState = (
    updatedProduct: FetchProduct,
    fullCategory: string
  ) => {
    if (!dashboardProducts) return;
    updatedProduct.category = fullCategory;
    const updatedProducts = dashboardProducts.product.map((product) =>
      product._id === updatedProduct._id ? updatedProduct : product
    );

    setDashboardProducts({ ...dashboardProducts, product: updatedProducts });
  };

  const deleteMultipleProductState = (products: FetchProduct[]) => {
    setDashboardProducts((prevState) => {
      if (!prevState || !prevState.product) return prevState;
      const productIdsToDelete = products
        .map((product) => product._id)
        .filter((id) => id !== undefined) as string[];
      const updatedProducts = prevState.product.filter((product) => {
        return (
          product._id !== undefined && !productIdsToDelete.includes(product._id)
        );
      });

      const totalPage = Math.ceil(updatedProducts.length / prevState.limit);

      return {
        ...prevState,
        product: updatedProducts,
        totalPage: totalPage,
        totalProduct: updatedProducts.length,
      };
    });
  };
  const fetchDashboardProducts = async (
    userId: string,
    page?: number,
    category?: string
  ) => {
    try {
      setDashboardProducts(undefined);
      const response = await getAllProducts({
        createdBy: userId,
        page: page,
        category: category,
      });
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
        deleteMultipleProductState,
        updateProductState,
        toggleChat,
        showChat,
        handleMessageSubmit,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
