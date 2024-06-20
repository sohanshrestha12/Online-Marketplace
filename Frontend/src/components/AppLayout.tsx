import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AppLayout = () => {
  return (
    <>
      <div className="min-h-screen px-[80px]">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default AppLayout;
