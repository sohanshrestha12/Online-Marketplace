import SideBar from "@/components/SideBar";
import SideBarItem from "@/components/SideBarItem";
import { useEffect, useState } from "react";
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
    } else {
      setActiveItem("sellerDashboard");
    }
  }, [location]);

  console.log(location);
  return (
    <div className="flex">
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
        <SideBarItem icon={<MdDashboard />} text={"All Products"} alert />
      </SideBar>
      <Outlet />
    </div>
  );
};

export default SellerDashboardLayout;
