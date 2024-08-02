import { createMessage } from "@/api/Message";
import { createNotification } from "@/api/Notification";
import {
  getAllProducts,
  getCreatedDataByMonth,
  getSalesDataByMonth,
} from "@/api/Product";
import { FetchFilterProduct, FetchProduct } from "@/pages/ProductDetails";
import { User } from "@/Types/Auth";
import { CombinedData, CreatedData, SalesData } from "@/Types/Product";
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
    filter?: {
      category?: string;
      title?: string;
    },
    shortField?: string,
    sortOrder?: string
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
    productId?: string
  ) => void;
  getCombinedDataForChart: () => Promise<CombinedData[] | undefined>;
  setChat: () => void;
  homeAllProducts: FetchProduct[];
  handleNextPage: () => void;
  hasMore: boolean;
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
  getCombinedDataForChart: () => Promise.resolve(undefined),
  setChat: () => {},
  homeAllProducts: [],
  handleNextPage() {},
  hasMore: false,
});

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<FetchProduct[]>([]);
  const [showChat, setShowChat] = useState<boolean>(false);
  const [homeAllProducts, setHomeAllProducts] = useState<FetchProduct[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const [dashboardProducts, setDashboardProducts] = useState<
    FetchFilterProduct | undefined
  >(undefined);

  useEffect(() => {
    const fetchAllProduct = async () => {
      try {
        const response = await getAllProducts({ limit: 12, page: page });
        setHomeAllProducts(response.data.data.product);
        setHasMore(
          response.data.data.product.length > 0 ||
            response.data.data.product.length === 12
        );
        console.log("This is all product", response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllProduct();
  }, []);

  const handleNextPage = async () => {
    try {
      const newPage = page + 1;
      setPage(newPage);
      const response = await getAllProducts({ limit: 12, page: newPage });
      setHomeAllProducts((prevData) => [
        ...prevData,
        ...response.data.data.product,
      ]);
      setHasMore(
        response.data.data.product.length > 0 &&
          response.data.data.product.length === 12
      );
      console.log("This is next page product", response);
    } catch (error) {
      console.log(error);
    }
  };

  const getCombinedDataForChart = async (): Promise<
    CombinedData[] | undefined
  > => {
    try {
      const createdData = await getCreatedDataByMonth();

      const salesData = await getSalesDataByMonth();

      const combinedData = Array.from({ length: 12 }, (_, i) => ({
        month: new Date(0, i).toLocaleString("en-US", { month: "long" }),
        totalSold: 0,
        totalCreated: 0,
      }));
      salesData.data.data.forEach((sale: SalesData) => {
        combinedData[parseInt(sale.month) - 1].totalSold = parseInt(
          sale.totalSold
        );
      });
      createdData.data.data.forEach((created: CreatedData) => {
        combinedData[parseInt(created.month) - 1].totalCreated = parseInt(
          created.totalCreated
        );
      });

      return combinedData;
    } catch (error) {
      console.log(error);
    }
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };
  const setChat = () => {
    setShowChat(true);
  };

  const handleMessageSubmit = async (
    values: FormikValues,
    { resetForm }: FormikHelpers<FormikValues>,
    socket: Socket,
    user: User,
    roomId: string,
    productId?: string
  ) => {
    if (user && socket) {
      try {
        await createMessage({
          roomId,
          senderId: user._id,
          message: values.message,
        });
        const ids = roomId.split("-");
        const receiverId = ids[1];
        if (user._id !== receiverId) {
          const notification = await createNotification({
            receiverId,
            senderId: user._id,
            message: values.message,
            productId,
          });
          console.log("this is notification", notification);
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
    setProducts((prevProduct) => {
      const updatedProduct = [product, ...prevProduct];
      if (updatedProduct.length > 12) {
        updatedProduct.pop();
      }
      return updatedProduct;
    });
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
    filter?: {
      category?: string;
      title?: string;
    },
    shortField?: string,
    sortOrder?: string
  ) => {
    try {
      setDashboardProducts(undefined);
      const response = await getAllProducts({
        createdBy: userId,
        page: page,
        filter: filter,
        shortField: shortField,
        sortOrder: sortOrder,
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
        const response = await getAllProducts({ limit: 12, sort: "desc" });
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
        getCombinedDataForChart,
        setChat,
        homeAllProducts,
        handleNextPage,
        hasMore,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
