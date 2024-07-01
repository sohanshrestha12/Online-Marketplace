import { useAuth } from "@/components/Auth/ProtectedRoutes";
import { Link, Outlet, useLocation } from "react-router-dom";

const ProfileLayout = () => {
  const auth = useAuth();
  const location = useLocation();
  return (
    <div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-3">
          <h2 className="text-sm mb-3 font-semibold">
            Hello {auth.user?.username}
          </h2>
          <h3 className="font-semibold text-lg">Manage My Account</h3>
          <ul className="py-3 flex flex-col gap-2">
            <Link to={"/profile"}>
              <li
                className={`px-3 py-2 hover:bg-slate-100 hover:border-l-2 hover:font-semibold hover:border-orange-500 transition-all ease-in-out ${
                  location.pathname === "/profile"
                    ? "bg-slate-100 border-l-2 border-orange-500 font-semibold"
                    : ""
                }`}
              >
                My Profile
              </li>
            </Link>
            <Link to={"/profile/myOrders"}>
              <li
                className={`px-3 py-2 hover:bg-slate-100 hover:border-l-2 hover:font-semibold hover:border-orange-500 transition-all ease ${
                  location.pathname === "/profile/myOrders"
                    ? "bg-slate-100 border-l-2 border-orange-500"
                    : ""
                }`}
              >
                My Order
              </li>
            </Link>
          </ul>
        </div>
        <div className="col-span-9">
            <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
