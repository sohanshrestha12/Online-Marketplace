import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Seller from "./components/Seller";

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
      }
    ]
  },
]);


const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
