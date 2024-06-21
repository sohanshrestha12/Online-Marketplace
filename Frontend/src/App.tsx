import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Seller from "./components/Seller";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout/>,
    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        path:'seller',
        element:<Seller/>
      },{
        path:'login',
        element:<Login/>
      },{
        path:'productDetails',
        element:<ProductDetails/>
      }
    ]
  },
]);


const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
