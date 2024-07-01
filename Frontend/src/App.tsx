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
import Profile from "./pages/Profile";
import MyOrder from "./pages/MyOrder";
import ProfileLayout from "./pages/ProfileLayout";
import RequireAuth from "./components/Auth/RequireAuth";

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
      {
        path: "profile",
        element: (
          <RequireAuth>
            <ProfileLayout />
          </RequireAuth>
        ),
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: "myOrders",
            element: <MyOrder />,
          },
        ],
      },
    ],
  },
  {
    path: "sellerDashboard",
    element: <SellerDashboardLayout />,
    children: [
      {
        path: "addProduct",
        element: <AddProduct />,
      },
    ],
  },
]);


const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
