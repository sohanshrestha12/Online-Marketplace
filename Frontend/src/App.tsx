import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Seller from "./components/Seller";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import SignUp from "./pages/SignUp";
import ProductLists from "./pages/ProductLists";
import Error from "./pages/Error";
import AddToCart from "./pages/AddToCart";
import SellerDashboardLayout from "./pages/SellerDashboardLayout";
import AddProduct from "./pages/AddProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "seller",
        element: <Seller />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
      {
        path: "productDetails/:id",
        element: <ProductDetails />,
      },
      {
        path: "productLists",
        element: <ProductLists />,
      },
      {
        path: "AddToCart",
        element: <AddToCart />,
      },
    ],
  },
  {
    path: "sellerDashboard",
    element: <SellerDashboardLayout />,
    children:[
      {
        path:"addProduct",
        element:<AddProduct/>
      },
    ]
  },
]);


const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
