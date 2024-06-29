import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";

const AppLayout = () => {
  return (
    <>
      <div className="min-h-screen px-[80px]">
        <ScrollToTop/>
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default AppLayout;
