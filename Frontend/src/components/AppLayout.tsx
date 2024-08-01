import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";

const AppLayout = () => {
  return (
    <>
      <div className="min-h-screen dark:bg-slate-800 px-[80px] pb-24">
        <ScrollToTop/>
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default AppLayout;
