import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import RequireAuth from "./components/Auth/RequireAuth";
import RequireSeller from "./components/Auth/RequireSeller";
import Favourites from "./components/Favourites";
import AddProduct from "./pages/AddProduct";
import AddToCart from "./pages/AddToCart";
import Dashboard from "./pages/Dashboard";
import EmailVerification from "./pages/EmailVerification";
import Error from "./pages/Error";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyOrder from "./pages/MyOrder";
import MyProduct from "./pages/MyProduct";
import ProductDetails from "./pages/ProductDetails";
import ProductLists from "./pages/ProductLists";
import Profile from "./pages/Profile";
import ProfileLayout from "./pages/ProfileLayout";
import Seller from "./pages/Seller";
import SellerDashboardLayout from "./pages/SellerDashboardLayout";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import ReturnBack from "./pages/ReturnBack";
import ChangePassword from "./pages/ChangePassword";

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
        path:"forgotPassword",
        element:<ForgotPassword />
      },
      {
        path:"reset_password/:token",
        element:<ResetPassword/>
      },
      {
        path:"returnBack",
        element:<ReturnBack/>
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
        path: "EmailVerification",
        element: <EmailVerification />,
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
            path:"changePassword",
            element:<ChangePassword/>
          },
          {
            path: "cart",
            element: <AddToCart />,
          },
          {
            path: "myOrders",
            element: <MyOrder />,
          },
          {
            path: "favourites",
            element: <Favourites />,
          },
        ],
      },
    ],
  },
  {
    path: "sellerDashboard",
    element: (
      <RequireSeller>
        <SellerDashboardLayout />
      </RequireSeller>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "addProduct",
        element: <AddProduct />,
      },
      {
        path: "myProduct",
        element: <MyProduct />,
      },
    ],
  },
]);


const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
