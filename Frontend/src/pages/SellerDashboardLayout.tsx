import SideBar from "@/components/SideBar";
import SideBarItem from "@/components/SideBarItem";
import { useEffect, useState } from "react";
import { FaBox } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { VscAdd } from "react-icons/vsc";
import { Link, Outlet, useLocation } from "react-router-dom";

const SellerDashboardLayout = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string>("sellerDashboard");
  useEffect(() => {
    const pathname = location.pathname;

    if (pathname.includes("addProduct")) {
      setActiveItem("addProduct");
    }else if (pathname.includes("myProduct")) {
      setActiveItem("myProduct");
    } else {
      setActiveItem("sellerDashboard");
    }
  }, [location]);

  console.log(location);
  return (
    <div className="flex max-w-screen">
      <SideBar>
        <Link to="/sellerDashboard">
          <SideBarItem
            icon={<MdDashboard />}
            text={"Dashboard"}
            alert
            active={activeItem === "sellerDashboard"}
          />
        </Link>
        <Link to="/sellerDashboard/addProduct">
          <SideBarItem
            icon={<VscAdd />}
            text={"Add Product"}
            alert
            active={activeItem === "addProduct"}
          />
        </Link>
        <Link to="/sellerDashboard/myProduct">
          <SideBarItem
            icon={<FaBox />}
            text={"My Product"}
            alert
            active={activeItem === "myProduct"}
          />
        </Link>
      </SideBar>
      <Outlet />
    </div>
  );
};

export default SellerDashboardLayout;
